export type OAuthProvider = "google" | "github" | "naver" | "kakao";

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  authUrl: string;
  scope?: string;
}
