"use client";

import { ChevronDown, Eye } from "lucide-react";
import { Mail } from "../types/mail";
import { useToggleAnswer } from "../model/useToggleAnswer";

interface Props {
  data: Mail;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
  isLaoding : boolean;
}

const QuestionItem = ({ data, isOpen, onToggle, isLast, isLaoding }: Props) => {
  const { open, openAnswer } = useToggleAnswer();

  return (
    <div className={`${!isLast && "border-b"}  border-border`}>
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={onToggle}>
        <div className="flex items-center gap-4">
          <span className="text-primary font-semibold">{data.id}.</span>
          <p className="font-semibold text-sm break-keep xl:text-base">
            {data.title}
          </p>
        </div>
        <ChevronDown
          className={`text-gray transform transition-transform ${
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
            <div className="flex text-gray-700">
              <span className="text-primary font-semibold shrink-0 mr-2">
                Q:
              </span>
              <p className="flex-1 break-keep">{data.content}</p>
            </div>
            <div className="flex text-green-700 relative">
              <span className="font-semibold shrink-0 mr-2">A:</span>
              <p className={`flex-1 break-keep transition-all ${open ? "blur-0" : "blur-sm"}`}>{data.answer}</p>
              {!open && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                  <div
                    className="flex items-center gap-1 text-gray hover:text-lightgray transition-colors cursor-pointer"
                    onClick={openAnswer}>
                    <p className="font-semibold">답안 보기</p>
                    <Eye size={20} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
