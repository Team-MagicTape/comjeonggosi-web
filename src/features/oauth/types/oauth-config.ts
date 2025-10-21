export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  authUrl: string;
  scope?: string;
  responseType: "code" | "id_token"; // OAuth 2.0은 code, OpenID Connect는 id_token
}
