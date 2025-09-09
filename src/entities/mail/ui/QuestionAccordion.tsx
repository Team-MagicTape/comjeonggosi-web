"use client";

import { useState } from "react";
import { Mail } from "@/entities/mail/types/mail";
import QuestionItem from "@/entities/mail/ui/QuestionItem";
import { MailCheck } from "lucide-react";
import CustomLink from "@/shared/ui/CustomLink";
import Button from "@/shared/ui/Button";
import Tabs from "@/widgets/tabs/ui/Tabs";
import { Category } from "@/entities/category/types/category";
import { useGetMails } from "../model/useGetMails";
import { useToggleAccordion } from "../model/useToggleAccordion";

interface Props {
  mails: Mail[];
  categories: Category[];
}

const QuestionAccordion = ({ categories, mails }: Props) => {
  const { handleToggle, openIndex } = useToggleAccordion();
  const { data, category, categoryList, setCategory, isLoading } = useGetMails(
    categories,
    mails
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full p-4 border border-border bg-white rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">받은 질문들</h2>
        <Tabs
          tabs={categoryList}
          selected={category}
          setSelected={setCategory}
        />
        <div className="flex flex-col">
          {data.length > 0 ? (
            data.map((mail, idx, arr) => (
              <QuestionItem
                isLast={arr.length - 1 === idx}
                key={mail.id}
                data={mail}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
                isLoading={isLoading}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto mb-4">
                <MailCheck className="text-gray-400" size={32} />
              </div>
              <p className="text-gray text-base">아직 받은 메일이 없습니다.</p>
              <p className="text-lightgray text-sm mt-1">
                메일 신청을 하고 매일 원하는 시간에 CS 질문을 받아보세요!
              </p>
              <CustomLink
                className="w-full flex justify-center mt-4"
                href="/mail"
              >
                <Button>메일 신청하기</Button>
              </CustomLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionAccordion;
