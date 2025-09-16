"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { ArrowRight } from "lucide-react";

const MainQuiz = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-4 lg:p-6 flex flex-col gap-3">
      <h2 className="text-lg lg:text-xl font-semibold">퀴즈 풀기</h2>
      <p className="text-sm text-gray-600 text-center break-keep">다양한 퀴즈를 풀며 면접 질문에 대비해요!</p>
      <CustomLink href="/quizzes" className="mx-auto bg-primary text-white px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
        퀴즈 풀러가기
        <ArrowRight size={16} />
      </CustomLink>
    </div>
  )
}

export default MainQuiz