import { usePathname, useSearchParams } from "next/navigation";
import { OAuthProvider } from "@/features/oauth/types/oauth-provider";
import { getOAuthUrl } from "@/features/oauth/libs/oauth-config";

export const useOAuthButton = (provider: OAuthProvider) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOAuth = () => {
    const currentPath = `${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
    localStorage.setItem("redirect", currentPath);

    const state = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);

    window.location.href = getOAuthUrl(provider, state, nonce);
  };

  return handleOAuth;
};
