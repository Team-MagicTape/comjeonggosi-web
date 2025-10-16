import { customFetch } from "@/shared/libs/custom-fetch";
import { ReviewStat } from "../types/review-stat";

/**
 * 복습 통계 조회
 */
export const fetchReviewStats = async () => {
  try {
    const { data } = await customFetch.get<ReviewStat>("/reviews/stats");
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
