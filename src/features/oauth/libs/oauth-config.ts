import { OAuthProvider } from "../types/oauth-provider";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

const configs = {
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid profile email",
  },
  github: {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
    authUrl: "https://github.com/login/oauth/authorize",
    scope: "read:user user:email",
  },
  naver: {
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
    authUrl: "https://nid.naver.com/oauth2.0/authorize",
    scope: "name email",
  },
  kakao: {
    clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
    authUrl: "https://kauth.kakao.com/oauth/authorize",
    scope: "profile_nickname account_email",
  },
};

export const getOAuthUrl = (provider: OAuthProvider, state: string, nonce: string): string => {
  const config = configs[provider];
  const isGithub = provider === "github";
  
  const redirectUri = `${baseUrl}/auth/callback/${provider}`;
  
  console.log('[OAuth] Redirect URI:', redirectUri);
  
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: isGithub ? "code" : "id_token",
    state,
    scope: config.scope,
    ...(!isGithub && { nonce }),
  });

  return `${config.authUrl}?${params.toString()}`;
};
