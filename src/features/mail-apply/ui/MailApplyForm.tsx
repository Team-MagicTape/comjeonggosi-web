"use client";

import Spacer from "@/shared/ui/Spacer";
import { useMailApplyForm } from "../model/useMailApplyForm";
import { getCategoryType } from "../types/category";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  initialHour?: number;
  categories: getCategoryType[];
}

const MailApplyForm = ({ initialHour, categories }: Props) => {
  const {
    time,
    handleTimeDown,
    handleTimeUp,
    isSubscribed,
    handleClick,
    handleCategoryChange,
    selectedCategoryIds,
  } = useMailApplyForm(initialHour);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-8">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            메일 신청하기
          </h1>
          <p className="text-gray-500 text-sm">
            자신이 원하는 시간에 CS 퀴즈를 풀어보세요! <br />
            선택한 주제별로 맞춤형 퀴즈를 받아보실 수 있습니다.
          </p>
        </div>

        <div className="w-full">
          <label className="block text-lg font-semibold mb-2">선호 시간</label>
          <div className="flex items-center border border-border rounded-2xl overflow-hidden w-[180px]">
            <p className="flex-1 text-xl text-center py-2">{time}:00</p>
            <div className="flex flex-col border-l border-border">
              <button
                className="p-1 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={handleTimeUp}>
                <ChevronUp />
              </button>
              <hr className="text-border" />
              <button
                className="p-1 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={handleTimeDown}>
                <ChevronDown />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <label className="block text-lg font-semibold mb-2">
            관심 주제 (복수 선택 가능)
          </label>
          <div className="w-full max-h-120 overflow-scroll">
            <div className="w-full flex flex-col gap-2">
              {categories.map((cat) => (
                <div className="w-full flex items-center p-2 rounded-item bg-bg gap-2" onClick={() => handleCategoryChange(cat.id)} key={cat.id}>
                  <input type="checkbox" checked={selectedCategoryIds.includes(cat.id)} readOnly className="accent-primary bg-white" />
                  <p>{cat.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Spacer />

        <button
          className={`w-full py-3 rounded-xl font-bold text-lg transition-colors ${
            isSubscribed
              ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
              : "bg-primary text-white hover:bg-orange-600"
          }`}
          onClick={handleClick}>
          {isSubscribed ? "신청 취소" : "메일 신청"}
        </button>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-lg flex items-center justify-center p-6">
        <div className="border border-gray-300 w-[250px] h-[500px] rounded-3xl flex items-center justify-center text-gray-400">
          핸드폰 프리뷰
        </div>
      </div>
    </div>
  );
};

export default MailApplyForm;
