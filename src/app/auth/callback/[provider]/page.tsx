"use client";

import { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { OAUTH_PROVIDERS } from "@/shared/constants/oauth-providers";
import { OAuthProvider } from "@/features/oauth/types/oauth-provider";
import { sendAuthToken } from "@/features/oauth/api/exchange-token";

const OAuthCallbackPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const provider = params.provider as string;

      if (!provider || !OAUTH_PROVIDERS.includes(provider as OAuthProvider)) {
        router.replace("/login?error=invalid_provider");
        return;
      }

      const isGithub = provider === "github";
      let token: string | null = null;

      if (isGithub) {
        token = searchParams.get("code");
      } else {
        const hash = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);
        token = hashParams.get("id_token");
      }

      if (!token) {
        router.replace("/login?error=no_token");
        return;
      }

      try {
        await sendAuthToken(provider, token);

        const redirectPath = localStorage.getItem("redirect") || "/";
        localStorage.removeItem("redirect");
        
        // 캐시를 무시하고 완전히 새로고침 (timestamp 추가로 캐시 방지)
        const finalUrl = redirectPath + (redirectPath.includes('?') ? '&' : '?') + '_t=' + Date.now();
        window.location.href = finalUrl;
      } catch (error) {
        console.error("[OAuthCallback] Auth error:", error);
        router.replace("/login?error=auth_failed");
      }
    };

    handleCallback();
  }, [params, searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-lg">로그인 처리중...</div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
