"use client";

import { MySubmission } from "../types/my-submission";
import MySubmissionItemSkeleton from "./MySubmissionItemSkeleton";

interface Props {
  data: MySubmission;
  isLoading: boolean;
}

const MySubmissionItem = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return <MySubmissionItemSkeleton />;
  }
  return (
    <div className="relative p-6 rounded-item border border-border">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800 text-lg">
            {data.quiz.content}
          </h3>
          <div
            className={`px-3 py-1 rounded-full text-xs ${
              data.isCorrected
                ? "bg-green-100 text-green-600"
                : "bg-red-200 text-red-600"
            }`}
          >
            {data.isCorrected ? "맞았습니다!" : "틀렸습니다"}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 min-w-[60px]">
            내 답안:
          </span>
          <div className="flex-1 px-3 py-2 rounded-lg font-medium border border-border flex items-center gap-4 flex-wrap">
            <p
              className={`${
                !data.isCorrected
                  ? "line-through [text-decoration-color:red] [text-decoration-style:double]"
                  : "text-green-600 font-semibold"
              } break-keep`}
            >
              {data.userAnswer}
            </p>
            {!data.isCorrected && (
              <p className="break-keep text-green-600 font-semibold">
                {data.quiz.answer}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center gap-1 text-lightgray text-sm">
        <p>{data.quiz.category.name}</p>
        <p>·</p>
      </div>
    </div>
  );
};

export default MySubmissionItem;
