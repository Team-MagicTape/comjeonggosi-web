"use client";

import { Review } from "@/entities/review/types/review";
import { ReviewStat } from "@/entities/review/types/review-stat";
import ReviewItem from "@/entities/review/ui/ReviewItem";
import ReviewStats from "@/entities/review/ui/ReviewStats";
import Button from "@/shared/ui/Button";
import CustomLink from "@/shared/ui/CustomLink";
import { Brain, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  reviews: Review[] | null;
  stats: ReviewStat | null;
}

const INITIAL_DISPLAY_COUNT = 5;

const MyReviews = ({ reviews, stats }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-2xl">
      <h2 className="mb-4 text-xl font-semibold">복습 관리</h2>

      {stats && <ReviewStats stats={stats} />}

      <div className="mt-4 space-y-3">
        {!reviews || reviews.length === 0 ? (
          <div className="py-12 text-center">
            <div className="p-4 mx-auto mb-4 rounded-full bg-gray-50 w-fit">
              <Brain className="text-gray-400" size={32} />
            </div>
            <p className="text-base text-gray">아직 복습할 항목이 없습니다.</p>
            <p className="mt-1 text-sm text-lightgray">
              퀴즈를 풀고 복습을 시작해보세요!
            </p>
            <CustomLink
              className="flex justify-center w-full mt-4"
              href="/quizzes"
            >
              <Button>퀴즈 바로가기</Button>
            </CustomLink>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">
                추천 복습 항목
              </h3>
              <span className="text-xs text-gray-500">
                {reviews.length}개 항목
              </span>
            </div>
            {(isExpanded
              ? reviews
              : reviews.slice(0, INITIAL_DISPLAY_COUNT)
            ).map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </>
        )}
      </div>

      {reviews && reviews.length > INITIAL_DISPLAY_COUNT && (
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
                더보기 ({reviews.length - INITIAL_DISPLAY_COUNT}개 더 보기)
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
