"use client"

import { Category } from "@/entities/category/types/category";
import { Mail } from "@/entities/mail/types/mail";
import CustomLink from "@/shared/ui/CustomLink";

interface Props {
  data: Mail;
  category: Category | null
}

const TodayQuestionItem = ({ data, category }: Props) => {
  return (
    <CustomLink href={`/questions/${data.id}`} className="w-full h-full bg-white rounded-[16px] p-7">
      <div className="flex justify-between mb-4">
        <div className="h-8 bg-[#ff723a] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
          <span className="text-[white] font-semibold">Day {data.day}</span>
        </div>
        <div className="h-8 bg-[#f1f3f4] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
          <span className="text-[#858586] font-semibold">{category?.name}</span>
        </div>
      </div>
      <div className="font-bold text-[18px] text-[#333] mb-[13px]">
        {data.title}
      </div>
      <div className="text-[#666] text-[14px] line-clamp-2 overflow-hidden mb-[13px]">
        {data.content}
      </div>
      <div className="w-full h-[1px] bg-[#f1f3f4] mb-[13px]"></div>
      <div className="text-[#ff723a] font-bold text-[15px] mb-[13px]">
        오늘의 답변
      </div>
      <div className="line-clamp-2 text-[#333]">
        {data.answer}
      </div>
    </CustomLink>
  );
};

export default TodayQuestionItem;
