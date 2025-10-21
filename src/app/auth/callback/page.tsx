"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeToken } from "@/features/oauth/api/exchange-token";
import { OAuthProvider } from "@/features/oauth/types/oauth-provider";
import { Loader2, AlertCircle } from "lucide-react";
import { OAUTH_PROVIDERS } from "@/shared/constants/oauth-providers";

const OAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL에서 code와 state 추출
        const code = searchParams.get("code");
        const receivedState = searchParams.get("state");

        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        if (!receivedState) {
          throw new Error("State 파라미터가 없습니다.");
        }

        // CSRF 방지: state 검증
        const storedState = sessionStorage.getItem("oauth_state");
        const storedProvider = sessionStorage.getItem(
          "oauth_provider"
        ) as OAuthProvider;

        if (!storedState || !storedProvider) {
          throw new Error("OAuth 세션 정보가 없습니다. 다시 시도해주세요.");
        }

        if (receivedState !== storedState) {
          throw new Error("State 불일치: CSRF 공격 가능성이 있습니다.");
        }

        if (!OAUTH_PROVIDERS.includes(storedProvider)) {
          throw new Error("유효하지 않은 OAuth 공급자입니다.");
        }

        // 사용된 state와 provider 정보 삭제 (재사용 방지)
        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("oauth_provider");

        // 토큰 교환
        const status = await exchangeToken(storedProvider, code);
        if (!status.toString().startsWith("2")) {
          throw new Error("토큰 변환에 실패했습니다.");
        }

        const redirectPath = localStorage.getItem("redirect") || "/";
        localStorage.removeItem("redirect");

        router.replace(redirectPath);
      } catch (err) {
        console.error("OAuth callback error:", err);

        // 에러 발생 시 저장된 OAuth 정보 정리
        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("oauth_provider");

        setError(
          err instanceof Error
            ? err.message
            : "로그인 처리 중 오류가 발생했습니다."
        );
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="p-8 bg-white border border-red-100 shadow-lg rounded-2xl">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="mb-8 text-center">
              <p className="mb-3 text-2xl font-bold text-gray-900">
                로그인 실패
              </p>
              <p className="leading-relaxed text-gray-600">{error}</p>
            </div>

            <button
              onClick={() => router.replace("/login")}
              className="w-full px-4 py-3 font-medium text-white transition-colors duration-200 bg-red-500 rounded-xl hover:bg-red-600"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          </div>

          <div className="text-center">
            <p className="mb-3 text-2xl font-bold text-gray-900">
              로그인 처리 중
            </p>
            <p className="leading-relaxed text-gray-600">
              잠시만 기다려주세요...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
