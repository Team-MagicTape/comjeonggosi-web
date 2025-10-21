"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeToken } from "@/features/oauth/api/exchange-token";
import { OAuthProvider } from "@/features/oauth/types/oauth";
import { Loader2, AlertCircle } from "lucide-react";
import { cookies } from "next/headers";
import {
  ACCESSTOKEN_COOKIE_OPTION,
  REFRESHTOKEN_COOKIE_OPTION,
} from "@/shared/constants/cookie-option";

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

        if (
          !provider ||
          !["google", "github", "naver", "kakao"].includes(provider)
        ) {
          throw new Error("유효하지 않은 OAuth 공급자입니다.");
        }

        const { accessToken, refreshToken } = await exchangeToken(
          provider,
          code
        );

        const cookieStore = await cookies();
        cookieStore.set("accessToken", accessToken, {
          ...ACCESSTOKEN_COOKIE_OPTION,
        });
        cookieStore.set("refreshToken", refreshToken, {
          ...REFRESHTOKEN_COOKIE_OPTION,
        });

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-2xl font-bold text-gray-900 mb-3">
                로그인 실패
              </p>
              <p className="text-gray-600 leading-relaxed">{error}</p>
            </div>

            <button
              onClick={() => router.replace("/login")}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-600 transition-colors duration-200"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 mb-3">
              로그인 처리 중
            </p>
            <p className="text-gray-600 leading-relaxed">
              잠시만 기다려주세요...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
