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
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL에서 code와 provider 추출
        const code = searchParams.get("code");
        const provider = searchParams.get("state") as OAuthProvider; // state에 provider 정보 저장

        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        if (!provider || !OAUTH_PROVIDERS.includes(provider)) {
          throw new Error("유효하지 않은 OAuth 공급자입니다.");
        }

        const status = await exchangeToken(provider, code);
        if (!status.toString().startsWith("2")) {
          throw new Error("토큰 변환에 실패했습니다.");
        }

        const redirectPath = localStorage.getItem("redirect") || "/";
        localStorage.removeItem("redirect");

        router.replace(redirectPath);
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "로그인 처리 중 오류가 발생했습니다."
        );
        setIsProcessing(false);
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
