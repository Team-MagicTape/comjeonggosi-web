"use client";

import CustomLink from "@/shared/ui/CustomLink";

const MainQuiz = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-4 lg:p-6">
      <h2 className="text-lg font-semibold mb-2">퀴즈 풀기</h2>
      <p className="text-sm text-gray-600 mb-3">
        다양한 퀴즈를 풀며 면접 질문에 대비해요!
      </p>
      <CustomLink 
        href="/quizzes" 
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        퀴즈 풀러가기 →
      </CustomLink>
    </div>
  )
}

export default MainQuiz