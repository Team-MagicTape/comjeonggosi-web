import { OAuthProvider } from "../types/oauth-provider";
import { OAuthConfig } from "../types/oauth-config";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");
const redirectUri = `${baseUrl}/auth/callback`;

const oauthConfigs: Record<OAuthProvider, OAuthConfig> = {
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    redirectUri,
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid profile email",
  },
  github: {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
    redirectUri,
    authUrl: "https://github.com/login/oauth/authorize",
    scope: "read:user user:email",
  },
  naver: {
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
    redirectUri,
    authUrl: "https://nid.naver.com/oauth2.0/authorize",
    scope: "name email",
  },
  kakao: {
    clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
    redirectUri,
    authUrl: "https://kauth.kakao.com/oauth/authorize",
    scope: "profile_nickname account_email",
  },
};

/**
 * OAuth 인증 URL 생성
 */
export const getOAuthUrl = (provider: OAuthProvider): string => {
  const config = oauthConfigs[provider];

  if (!config.clientId || config.clientId.trim() === "") {
    console.error(`Missing environment variable: ${provider}`);
    throw new Error(
      `OAuth 설정 오류: ${provider} 환경변수가 설정되지 않았습니다.`
    );
  }
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    ...(config.scope && { scope: config.scope }),
  });

  return `${config.authUrl}?${params.toString()}`;
};
