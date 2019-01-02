export class AcccessToken {
  jti: string;
  exp: number;
  nbf: number;
  iat: number;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  auth_time: number;
  session_state: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    }
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
