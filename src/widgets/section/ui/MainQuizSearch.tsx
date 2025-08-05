"use client";

import { ArrowRight } from "lucide-react";

const MainQuizSearch = () => {
  return (
    <div className="w-full bg-white border border-border rounded-2xl p-4 xl:p-8 flex flex-col gap-4">
      <h2 className="text-xl xl:text-2xl font-bold">퀴즈 풀기</h2>
      <p className="text-sm xl:text-base w-full text-center break-keep">다양한 퀴즈를 풀며 면접 질문에 대비해요!</p>
      <button className="mx-auto bg-primary text-white px-6 py-2 text-lg font-medium rounded-item flex items-center gap-1 mt-2 cursor-pointer">
        <p>퀴즈 풀러가기</p>
        <ArrowRight size={20} />
      </button>
    </div>
  )
}

export default MainQuizSearch