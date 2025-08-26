"use client";

import Button from "@/shared/ui/Button";
import { Category } from "@/entities/category/types/category";
import { MailDetail } from "../types/mail-detail";
import { useScrollToMail } from "../model/useScrollToMail";
import { useToggleAnswer } from "../model/useToggleAnswer";

interface Props {
  data: MailDetail;
  category: Category;
}

const MailTemplate = ({ data, category }: Props) => {
  const ref = useScrollToMail();
  const { open, openAnswer } = useToggleAnswer();

  return (
    <div
      className="w-full mx-auto bg-white rounded-2xl overflow-hidden"
      ref={ref}>
      <div className="bg-primary px-4 xl:px-8 pt-4 xl:pt-8 pb-4 text-white">
        <h1 className="xl:text-2xl font-bold mb-2 xl:mb-6 break-keep">{data.title}</h1>
        <div className="w-full flex justify-between items-end">
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20">
            {category.name}
          </span>
          <p className="text-blue-100 text-sm">{data.day}일 전</p>
        </div>
      </div>

      <div className="px-4 xl:px-8 py-4 xl:py-10 flex flex-col border-x border-border">
        <div className="text-blue-600 text-sm font-semibold mb-5 uppercase tracking-wide">
          CS 질문 #{data.id}
        </div>

        <div className="w-full text-center text-sm xl:text-xl font-semibold text-gray-800 mb-4 xl:mb-8 leading-relaxed bg-gray-50 py-10 px-2 break-keep border border-border rounded-item">
          {data.content}
        </div>

    

        {open ? (
          <div className="w-full text-sm xl:text-lg font-semibold text-green-800 leading-relaxed bg-green-50 p-5 border border-green-300 rounded-item break-keep scale-up-center">
            <span className="text-green-600 text-xs">모범 답안</span>
            <p>{data.answer}</p>
          </div>
        ) : (
          <Button onClick={openAnswer}>모범답안 확인하기</Button>
        )}
      </div>

      <div className="bg-gray-50 p-4 pb-5 text-center border border-border flex flex-col gap-4 rounded-b-2xl">
        <a
          href="#"
          className="text-lightgray hover:text-gray transition-colors">
          구독 해지
        </a>
      </div>
    </div>
  );
};

export default MailTemplate;
