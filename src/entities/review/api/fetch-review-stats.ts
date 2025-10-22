import { customFetch } from "@/shared/libs/custom-fetch";
import { ReviewStat } from "../types/review-stat";

/**
 * 복습 통계 조회
 */
export const fetchReviewStats = async (): Promise<ReviewStat | null> => {
  try {
    const { data } = await customFetch.get<ReviewStat>("/reviews/stats");
    return data || null;
  } catch (error) {
    console.error('[fetchReviewStats] Error:', error);
    return null;
  }
};
