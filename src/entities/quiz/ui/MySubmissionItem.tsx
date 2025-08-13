"use client";

import { Check, X } from "lucide-react";
import { MySubmission } from "../types/my-submission";

interface Props {
  data: MySubmission;
}

const MySubmissionItem = ({ data }: Props) => {
  return (
    <div
      className={`relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
        data.isCorrected
          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300 shadow-green-100/50"
          : "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:border-red-300 shadow-red-100/50"
      }`}>
      <div
        className={`absolute -top-2 -right-2 p-2 rounded-full shadow-lg ${
          data.isCorrected ? "bg-green-500" : "bg-red-500"
        }`}>
        {data.isCorrected ? (
          <Check className="text-white" size={16} />
        ) : (
          <X className="text-white" size={16} />
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className={`p-2 rounded-lg ${
            data.isCorrected ? "bg-green-100" : "bg-red-100"
          }`}>
          <p
            className={`text-3xl px-1.5 font-medium ${
              data.isCorrected ? "text-green-600" : "text-red-600"
            }`}>
            Q.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">
            {data.quiz.category.name}
          </h3>
          <div
            className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
              data.isCorrected
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}>
            {data.isCorrected ? "맞았습니다!" : "틀렸습니다!"}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-gray-700 text-base leading-relaxed bg-white/60 p-4 rounded-lg border border-gray-100">
          {data.quiz.content}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 min-w-[60px]">
            내 답안:
          </span>
          <div
            className={`flex-1 px-3 py-2 rounded-lg font-medium ${
              data.isCorrected
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}>
            {data.userAnswer}
          </div>
        </div>

        {!data.isCorrected && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 min-w-[60px]">
              정답:
            </span>
            <div className="flex-1 px-3 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 border border-gray-200">
              {data.quiz.answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissionItem;
