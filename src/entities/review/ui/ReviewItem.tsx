"use client";

import { Review } from "../types/review";
import { Brain } from "lucide-react";

interface Props {
  review: Review;
}

const getPriorityStyle = (priority: Review["priority"]) => {
  switch (priority) {
    case "HIGH":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        icon: "text-red-500",
        label: "긴급",
      };
    case "MIDDLE":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
        icon: "text-yellow-500",
        label: "보통",
      };
    default:
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "text-blue-500",
        label: "여유",
      };
  }
};

const ReviewItem = ({ review }: Props) => {
  const style = getPriorityStyle(review.priority);

  return (
    <div
      className={`p-4 rounded-xl border ${style.border} ${style.bg} transition-all hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-white`}>
          <Brain className={`w-5 h-5 ${style.icon}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{review.title}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}
            >
              {style.label}
            </span>
          </div>
          <p className="text-sm text-gray-600">{review.reason}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
