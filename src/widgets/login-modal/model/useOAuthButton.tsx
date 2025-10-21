import { usePathname, useSearchParams } from "next/navigation";
import { OAuthProvider } from "@/features/oauth/types/oauth";
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

    // OAuth URL 생성 및 이동
    const oauthUrl = getOAuthUrl(provider);

    // state 파라미터에 provider 정보 추가 (콜백에서 사용)
    const urlWithState = `${oauthUrl}&state=${provider}`;

    // OAuth 공급자 페이지로 리다이렉트
    window.location.href = urlWithState;
  };

  return handleOAuth;
};
