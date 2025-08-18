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
          <span className="text-primary font-semibold">{data.id}.</span>
          <p className="font-semibold">{data.title}</p>
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
          <div className="p-4 bg-gray-50 space-y-2">
            <p className="text-gray-700"><span className="text-primary font-semibold">Q: </span>{data.content}</p>
            <p className="text-green-700"><span className="font-semibold">A: </span>{data.answer}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default QuestionItem;
