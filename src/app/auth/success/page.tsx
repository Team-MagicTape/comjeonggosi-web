"use client"

import { useSuccess } from "@/features/oauth/model/useSuccess";
import { Link } from "lucide-react";


const OAuthSuccess = () => {
  useSuccess();

  return (
    <div className="w-full h-screen flex items-center justify-center gap-10 flex-col">
      <div className="w-50 h-50 flex items-center justify-center rounded-[100%] bg-[#f5f5f5]">
        <div className="w-25 h-25 flex items-center justify-center rounded-[100%] bg-orange-400">
          <span className="text-4xl text-white">
            ✓
          </span>
        </div>
      </div>
      <p className="text-5xl font-medium">로그인 성공!</p>
      <span className="text-xl">잠시후 홈페이지로 이동합니다...</span>
      <div className="w-full flex justify-center gap-2">
        <span className="text-[rgba(0,0,0,0.5)]">되지 않는다면</span>
        <Link href="/" className="text-orange-300">
          홈으로 이동하기
        </Link>
      </div>
    </div>
  )
}

export default OAuthSuccess