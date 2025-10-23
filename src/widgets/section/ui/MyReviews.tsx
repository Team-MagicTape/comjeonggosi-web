"use client";

import { Review } from "@/entities/review/types/review";
import { ReviewStat } from "@/entities/review/types/review-stat";
import { ReviewDueType } from "@/entities/review/types/review-due";
import ReviewStats from "@/entities/review/ui/ReviewStats";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  reviews: Review[] | null;
  stats: ReviewStat;
  dueData: ReviewDueType[];
}


const INITIAL_DISPLAY_COUNT = 5;

const MyReviews = ({ reviews, stats, dueData }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // reviews가 배열인지 확인
  const reviewList = Array.isArray(reviews) ? reviews : [];

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold">복습 관리</h2>

      <ReviewStats stats={stats} />

      <div className="mt-4 space-y-3">
        <h3 className="text-base font-medium">복습 예정 항목</h3>
        {dueData && dueData.length > 0 ? (
          dueData.map((item) => (
            <div key={item.id} className="p-3 rounded-xl bg-gray-100">
              <div className="font-medium">{item.content}</div>
              <div className="text-sm text-gray-500">
                {item.dueDate}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm">
            복습 예정 항목이 없습니다.
          </div>
        )}
      </div>

      {reviewList.length > INITIAL_DISPLAY_COUNT && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full gap-2 pt-3 mt-6 text-center transition-colors border-t cursor-pointer border-border text-gray hover:text-primary"
        >
          {isExpanded ? (
            <>
              <span>접기</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>
                더보기 ({reviewList.length - INITIAL_DISPLAY_COUNT}개 더 보기)
              </span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default MyReviews;