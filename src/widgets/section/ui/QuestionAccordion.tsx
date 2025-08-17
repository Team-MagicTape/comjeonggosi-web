"use client";

import { useState } from "react";
import { Mail } from "@/entities/mail/types/mail";
import QuestionItem from "@/entities/mail/ui/QuestionItem";

interface Props {
  mails: Mail[];
}

const QuestionAccordion = ({ mails }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full p-4 border border-border bg-white rounded-2xl">
        <h2 className="text-xl font-bold mb-4">받은 질문들</h2>
        <div className="flex flex-col">
          {mails.map((mail, idx, arr) => (
            <QuestionItem
              isLast={arr.length - 1 === idx}
              key={mail.id}
              data={mail}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionAccordion;