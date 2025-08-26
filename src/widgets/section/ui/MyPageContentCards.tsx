"use client";

import MySubmissions from "@/widgets/section/ui/MySubmissions";
import MailTemplate from "@/entities/mail/ui/MailTemplate";
import QuestionAccordion from "@/widgets/section/ui/QuestionAccordion";
import { MySubmission } from "@/entities/quiz/types/my-submission";
import { MailDetail } from "@/entities/mail/types/mail-detail";
import { Mail } from "@/entities/mail/types/mail";
import { Category } from "@/entities/category/types/category";
import { useState } from "react";

interface Props {
  submissions: MySubmission[];
  mails: Mail[];
  mail: MailDetail | null;
  questionCategory: Category | null;
}

const MyPageContentCards = ({
  submissions,
  mails,
  mail,
  questionCategory,
}: Props) => {
  const [activeId, setActiveId] = useState(0);
  const cards = [0, 1];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 메일 템플릿 카드 (조건부 렌더링) */}
      {mail && questionCategory && (
        <div className="w-full">
          <MailTemplate data={mail} category={questionCategory} />
        </div>
      )}

      <div className="w-full flex flex-col">
        <div>
          <div onClick={()=>{setActiveId(0)}} className="rounded-t-2xl border border-b-0 border-border bg-white">
            제출 현황
          </div>
          <div onClick={()=>{setActiveId(1)}} className="rounded-t-2xl border border-b-0 border-border bg-white">
            받은 질문들
          </div>
        </div>
        <div className="w-full">
          {/* 제출 현황 카드 */}
          {activeId === 0 && <MySubmissions submissions={submissions} />}

          {/* 질문 아코디언 카드 */}
          {activeId === 1 && <QuestionAccordion mails={mails} />}
        </div>
      </div>
    </div>
  );
};

export default MyPageContentCards;
