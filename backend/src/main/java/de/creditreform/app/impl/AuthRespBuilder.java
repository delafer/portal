package de.creditreform.app.impl;

import de.creditreform.app.model.jwt.JwtAccount;
import de.creditreform.app.model.jwt.JwtError;
import de.creditreform.app.model.jwt.JwtResponse;
import de.creditreform.app.model.jwt.JwtRoles;
import de.creditreform.app.model.User;
import de.creditreform.app.utils.JsonObject;
import org.jose4j.jwk.JsonWebKey;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.NumericDate;
import org.jose4j.keys.HmacKey;
import org.jose4j.lang.ByteUtil;
import org.jose4j.lang.JoseException;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AuthRespBuilder implements AuthBuilder {

    private final static long EXP_TIME_SECONDS = 300L;
    private final static String originUrl = "http://127.0.0.1:4001/api/Portal";
    public static final String AZP_AUTHORIZED_PARTY = "portal";
    public static final String AUTH_CONTEXT_CLASS = "1";
    public static final String[] REALM_ROLES = {"offline_access", "uma_authorization"};
    public static final String DEFAULT_ROLE = "view-profile";
    public static final String DEFAULT_SCOPE = "email profile";
    public static final String HEADER_TYPE = "JWT";

    public enum Scope {email("email profile");

     String name;
     Scope(String name) {this.name = name;}
     public String value() { return this.name; }
    };

    public enum TokenType {Bearer, Refresh};

    // these octets are from an earlier draft version (pre -12 I think) before JWKs were
    // used to encode the example keys. makes for a nice test though
    int[]  keyInts = {3, 35, 53, 75, 43, 15, 165, 188, 131, 126, 6, 101, 119, 123, 166,
            143, 90, 179, 40, 230, 240, 84, 201, 40, 169, 15, 132, 178, 210, 80,
            46, 191, 211, 251, 90, 146, 210, 6, 71, 239, 150, 138, 180, 195, 119,
            98, 61, 34, 61, 46, 33, 114, 5, 46, 79, 8, 192, 205, 154, 245, 103,
            208, 128, 163};
    byte[] keyBytes = ByteUtil.convertUnsignedToSignedTwosComp(keyInts);

    @Override
    public JwtResponse onSuccess(User data) throws Exception {

        JwtResponse r = new JwtResponse();
        r.setExpiresIn(EXP_TIME_SECONDS);
        r.setRefreshExpiresIn(EXP_TIME_SECONDS * 6l);
        r.setNotBeforePolicy(1545404210l);//TODO
        String sessState = getSessionState();
        r.setSessionState(sessState);
        r.setScope(Scope.email.value());
        String keyId = UUID.randomUUID().toString();
        r.setTokenType(JwtResponse.TokenType.bearer);
        r.setAccessToken(getToken(TokenType.Bearer, data, sessState, keyId));
        r.setRefreshToken(getToken(TokenType.Refresh, data, sessState, keyId));

        return  r;

    }

    @Override
    public JwtError onError(String err, String desc) {
        return new JwtError(err, desc);
    }

    @Override
    public JwtError onNotAuthorized() {
        return new JwtError("invalid_grant", "Invalid user credentials");
    }

    private RsaJsonWebKey getWebKey() throws JoseException {
        // Generate an RSA key pair, which will be used for signing and verification of the JWT, wrapped in a JWK
        RsaJsonWebKey rsaJsonWebKey = RsaJwkGenerator.generateJwk(2048);
        rsaJsonWebKey.setKeyId(UUID.randomUUID().toString());
        return rsaJsonWebKey;
    };

    private String getToken(TokenType type, User data, String sessionState, String keyId) throws JoseException {

        JwtClaims claims = new JwtClaims();

        claims.setGeneratedJwtId(); // [jti] a unique identifier for the token
        claims.setExpirationTimeMinutesInTheFuture(EXP_TIME_SECONDS / 60); // [exp] time when the token will expire
        claims.setNotBeforeMinutesInThePast(2); // [nbf] time before which the token is not yet valid (2 minutes ago)
        claims.setIssuedAtToNow();  // [iat] when the token was issued/created (now)
        claims.setIssuer(originUrl);  // [iss] who creates the token and signs it
        if (TokenType.Bearer.equals(type)) {
            claims.setAudience("account"); // [aud] to whom the token is intended to be sent
        } else {
            claims.setAudience(originUrl);
        }
        claims.setSubject(UUID.randomUUID().toString()); // [sub] the subject/principal is whom the token is about
        claims.setStringClaim("typ", type.name()); //[typ] : Type of toke
        claims.setStringClaim("azp", AZP_AUTHORIZED_PARTY); //[azt] : Authorized party
        claims.setNumericDateClaim("auth_time", NumericDate.now()); //[auth_time] : Time when authentication occurred
        claims.setStringClaim("session_state", sessionState); //[session_state] : session state

        if (TokenType.Bearer.equals(type)) {
            claims.setStringClaim("acr", AUTH_CONTEXT_CLASS); //[acr] : authentication context class
        }

        claims.setClaim("realm_access", JsonObject.of(JwtRoles.of(REALM_ROLES)));
        String[] roles = getRoles(data);
        claims.setClaim("resource_access", JsonObject.of(JwtAccount.of(roles)));

        claims.setStringClaim("scope", DEFAULT_SCOPE);

        if (TokenType.Bearer.equals(type)) {
            claims.setClaim("email_verified",true);
            claims.setStringClaim("name", mergeNotEmptyStrings(true, " ", data.getFirstname(), data.getLastname()));
            claims.setStringClaim("preferred_username", data.getUsername());
            claims.setStringClaim("given_name", data.getFirstname());
            claims.setStringClaim("family_name", data.getLastname());
            claims.setStringClaim("email", data.getEmail());

        }
        JsonWebSignature jws = new JsonWebSignature();
        jws.setPayload(claims.toJson());
        jws.setHeader("typ", HEADER_TYPE);

        if (TokenType.Bearer.equals(type)) {
            jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256);

            RsaJsonWebKey rsaJsonWebKey = RsaJwkGenerator.generateJwk(2048);
            rsaJsonWebKey.setKeyId(keyId);

            jws.setKey(rsaJsonWebKey.getPrivateKey());
            jws.setKeyIdHeaderValue(rsaJsonWebKey.getKeyId());
        } else {
            jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.HMAC_SHA256);
            JsonWebKey jwk = JsonWebKey.Factory.newJwk(new HmacKey(keyBytes));
            jws.setKey(new HmacKey(keyBytes));
            jws.setKeyIdHeaderValue(keyId);
        }


        String jwt = jws.getCompactSerialization();
        return jwt;
    }

    private String[] getRoles(User data) {
        String rolesArr = notNull(data.getRoles());
        String[] roles = rolesArr.split(",");
        if (roles.length==0 || rolesArr.isEmpty()) roles = new String[] {DEFAULT_ROLE};
        return roles;
    }

    private String notNull(String v) {
        return v != null ? v : "";
    }


    private String getSessionState() {
        return "84d86927-143a-4a56-82f6-084b39c1fc37";
    }

    private static String mergeNotEmptyStrings(boolean doTrimm, String separator, String... strings) {

        if (strings == null || strings.length == 0) return "";

        StringBuilder sb = new StringBuilder();
        for (String next : strings) {
            if (null == next || next.isEmpty()) continue;
            if (sb.length() > 0) sb.append(separator);
            sb.append(doTrimm ? next.trim() : next);
        }
        return sb.toString();
    }


}
