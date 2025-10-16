"use client";

import { Review } from "@/entities/review/types/review";
import { ReviewStat } from "@/entities/review/types/review-stat";
import ReviewItem from "@/entities/review/ui/ReviewItem";
import ReviewStats from "@/entities/review/ui/ReviewStats";
import Button from "@/shared/ui/Button";
import CustomLink from "@/shared/ui/CustomLink";
import { Brain } from "lucide-react";

interface Props {
  reviews: Review[] | null;
  stats: ReviewStat | null;
}

const MyReviews = ({ reviews, stats }: Props) => {
  return (
    <div className="w-full p-4 border border-gray-200 bg-white rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">복습 관리</h2>

      {stats && <ReviewStats stats={stats} />}

      <div className="space-y-3 mt-4">
        {!reviews || reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto mb-4">
              <Brain className="text-gray-400" size={32} />
            </div>
            <p className="text-gray text-base">아직 복습할 항목이 없습니다.</p>
            <p className="text-lightgray text-sm mt-1">
              퀴즈를 풀고 복습을 시작해보세요!
            </p>
            <CustomLink
              className="w-full flex justify-center mt-4"
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
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </>
        )}
      </div>

      {reviews && reviews.length > 0 && (
        <div className="w-full border-t border-border text-center mt-6 pt-3 text-gray cursor-pointer hover:text-primary transition-colors">
          더보기
        </div>
      )}
    </div>
  );
};

export default MyReviews;
