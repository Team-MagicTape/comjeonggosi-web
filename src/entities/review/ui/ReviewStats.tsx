"use client";

import { ReviewStat } from "../types/review-stat";
import { Brain, CheckCircle2, Flame, Target } from "lucide-react";

interface Props {
  stats: ReviewStat;
}

const ReviewStats = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">총 복습</span>
        </div>
        <p className="text-2xl font-bold text-blue-900">{stats.totalReviews}</p>
        <p className="text-xs text-blue-600 mt-1">개</p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-xs font-medium text-green-700">오늘 완료</span>
        </div>
        <p className="text-2xl font-bold text-green-900">
          {stats.completedToday}
        </p>
        <p className="text-xs text-green-600 mt-1">개</p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-orange-600" />
          <span className="text-xs font-medium text-orange-700">연속 학습</span>
        </div>
        <p className="text-2xl font-bold text-orange-900">{stats.streakDays}</p>
        <p className="text-xs text-orange-600 mt-1">일</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-medium text-purple-700">
            평균 정확도
          </span>
        </div>
        <p className="text-2xl font-bold text-purple-900">
          {stats.averageAccuracy}%
        </p>
        <p className="text-xs text-purple-600 mt-1">정답률</p>
      </div>
    </div>
  );
};

export default ReviewStats;
