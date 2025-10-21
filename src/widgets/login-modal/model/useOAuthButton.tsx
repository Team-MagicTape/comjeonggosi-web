import { usePathname, useSearchParams } from "next/navigation";
import { OAuthProvider } from "@/features/oauth/types/oauth-provider";
import { getOAuthUrl } from "@/features/oauth/libs/oauth-config";

export const useOAuthButton = (provider: OAuthProvider) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOAuth = () => {
    // 현재 경로를 localStorage에 저장 (로그인 후 리다이렉트용)
    const pathToStore = `${pathname}${
      searchParams.toString().length > 0 ? "?" + searchParams.toString() : ""
    }`;
    localStorage.setItem("redirect", pathToStore);

    // CSRF 방지를 위한 랜덤 state 생성
    const state = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // state와 provider를 sessionStorage에 저장 (콜백에서 검증용)
    sessionStorage.setItem("oauth_state", state);
    sessionStorage.setItem("oauth_provider", provider);

    // OAuth URL 생성
    const oauthUrl = getOAuthUrl(provider);

    // state 파라미터 추가 (CSRF 방지용)
    const urlWithState = `${oauthUrl}&state=${state}`;

    // OAuth 공급자 페이지로 리다이렉트
    window.location.href = urlWithState;
  };

  return handleOAuth;
};
