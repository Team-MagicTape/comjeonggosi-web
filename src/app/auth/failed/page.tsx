"use client";

import { useFail } from "@/features/oauth/model/useFail";
import CustomLink from "@/shared/ui/CustomLink";
import { AlertCircle } from "lucide-react";

const OAuthFail = () => {
  const redirectPath = useFail();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* 아이콘 */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* 제목과 설명 */}
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-gray-900 mb-3">로그인 실패</p>
            <p className="text-gray-600 leading-relaxed">
              로그인 시도 중 오류가 발생하였습니다.
              <br />
              잠시 후 시도해주세요.
            </p>
          </div>

          {/* 카운트다운 */}
          <div className=" p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              잠시후 자동으로 홈페이지로 이동합니다.
            </p>
          </div>
          <CustomLink href={redirectPath} className="">
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>홈으로 돌아가기</span>
            </button>
          </CustomLink>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100" />
      </div>
    </div>
  );
};

export default OAuthFail;
