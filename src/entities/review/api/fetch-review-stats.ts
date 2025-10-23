import { customFetch } from "@/shared/libs/custom-fetch";
import { ReviewStat } from "../types/review-stat";

export const fetchReviewStats = async (): Promise<ReviewStat> => {
  try {
    const { data } = await customFetch.get<ReviewStat>("/reviews/stats");
    return data;
  } catch (error) {
    console.error("fetchReviewStats Error:", error);
    return {
      totalReviews: 0,
      completedToday: 0,
      streakDays: 0,
      averageAccuracy: 0,
    };
  }
};
