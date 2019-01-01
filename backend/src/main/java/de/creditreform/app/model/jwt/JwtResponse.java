package de.creditreform.app.model.jwt;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@JsonNaming(PropertyNamingStrategy.LowerCaseWithUnderscoresStrategy.class)
public class JwtResponse implements Serializable {

    public enum TokenType {bearer};

    @XmlElement  (name  = "access_token")
    @JsonProperty(value = "access_token")
    private String accessToken;

    @XmlElement  (name  = "expires_in")
    @JsonProperty(value = "expires_in")
    private long expiresIn;

    @XmlElement  (name  = "refresh_expires_in")
    @JsonProperty(value = "refresh_expires_in")
    private long refreshExpiresIn;

    @XmlElement  (name  = "refresh_token")
    @JsonProperty(value = "refresh_token")
    private String refreshToken;

    @XmlElement  (name  = "token_type")
    @JsonProperty(value = "token_type")
    private TokenType tokenType;

    @XmlElement  (name  = "not-before-policy")
    @JsonProperty(value = "not-before-policy")
    private long notBeforePolicy;

    @XmlElement  (name  = "session_state")
    @JsonProperty(value = "session_state")
    private String sessionState;

    @XmlElement  (name  = "scope")
    @JsonProperty(value = "scope")
    private String scope;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public long getRefreshExpiresIn() {
        return refreshExpiresIn;
    }

    public void setRefreshExpiresIn(long refreshExpiresIn) {
        this.refreshExpiresIn = refreshExpiresIn;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public TokenType getTokenType() {
        return tokenType;
    }

    public void setTokenType(TokenType tokenType) {
        this.tokenType = tokenType;
    }

    public long getNotBeforePolicy() {
        return notBeforePolicy;
    }

    public void setNotBeforePolicy(long notBeforePolicy) {
        this.notBeforePolicy = notBeforePolicy;
    }

    public String getSessionState() {
        return sessionState;
    }

    public void setSessionState(String sessionState) {
        this.sessionState = sessionState;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
}
