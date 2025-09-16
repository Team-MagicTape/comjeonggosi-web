"use client";

import { useSurveyStore } from "../model/useSurveyStore";
import { X } from "lucide-react";

const Survey = () => {
  const { isVisible, setIsVisible } = useSurveyStore();

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-[#ff8f63]">
      <div className="w-full h-7 xl:h-10 text-white flex items-center px-2 xl:px-8 justify-between text-xs xl:text-base">
        <div className="flex items-center gap-3 flex-1 justify-center">
          <span className="font-semibold">더 나은 서비스를 위해 의견을 들려주세요!</span>
          <a
            href="https://naver.me/GypNVc3Y"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:opacity-80"
          >
            설문조사 링크 바로 가기
          </a>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 p-1 cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-4 h-4 xl:w-5 xl:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Survey;