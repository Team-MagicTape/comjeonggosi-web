"use client";

import { useMailApplyForm } from "../model/useMailApplyForm";
import { getCategoryType } from "../types/category";

interface Props {
  initialHour?: number;
  categories: getCategoryType[];
}
const MailApplyForm = ({ initialHour, categories }: Props) => {
  const {
    time,
    setTime,
    isSubscribed,
    handleClick,
    handleCategoryChange,
    selectedCategoryIds,
  } = useMailApplyForm(initialHour);

  return (
    <div className="flex h-screen pt-20 xl:pt-20">
      <div className="border-gray-300 border-1 w-1/2 h-full flex flex-col gap-9 items-center justify-center pt-6">
        <div className="w-[600px]">
          <span className="text-[30px] font-bold">메일 신청하기</span>
          <div className="flex flex-col text-[15px] font-semibold text-gray-500">
            <span>자신이 원하는 시간, cs퀴즈를 풀어보세요!</span>
            <span>선택한 주제별로 맞춤형 퀴즈를 받아보실 수 있습니다</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <span className="text-[17px] font-bold mb-1">선호 시간</span>
            <select
              className="w-[600px] h-[40px] border-gray-500 border-1 p-1 rounded-[7px]"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const hour = String(i).padStart(2, "0");
                return (
                  <option key={i} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="w-[600px]">
          <span className="text-[17px] font-bold">
            관심 주제 (복수 선택 가능)
          </span>
          <div>
            {categories.map((cat) => (
              <label key={cat.id}>
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(cat.id)}
                  onChange={() => handleCategoryChange(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>
        <div className="pb-6 w-[600px]">
          <button
            className="w-full h-[50px] bg-[#ff723a] text-white rounded-[7px] text-[18px] font-extrabold"
            onClick={handleClick}
          >
            {isSubscribed ? "신청 취소" : "메일 신청"}
          </button>
        </div>
      </div>
      <div className="w-1/2 h-full bg-gray-100 flex items-center justify-center">
        <span className="text-x">핸드폰 프리뷰</span>
      </div>
    </div>
  );
};

export default MailApplyForm;
