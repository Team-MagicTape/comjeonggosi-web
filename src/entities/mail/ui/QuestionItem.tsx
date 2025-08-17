"use client";

import { ChevronDown } from "lucide-react";
import { Mail } from "../types/mail";

interface Props {
  data: Mail;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

const QuestionItem = ({ data, isOpen, onToggle, isLast }: Props) => {
  return (
    <div className={`${!isLast && "border-b"}  border-border`}>
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={onToggle}>
        <div className="flex items-center gap-4">
          <span className="text-primary font-semibold">Q.</span>
          <p className="font-semibold">{data.question}</p>
        </div>
        <ChevronDown
          className={`text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          size={24}
        />
      </div>
      <div
        className="grid transition-all duration-500 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="p-4 bg-gray-50">
            <p className="text-gray-700">{data.answer}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default QuestionItem;
