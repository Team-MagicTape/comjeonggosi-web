import { Review } from "../types/review";
import { customFetch } from "@/shared/libs/custom-fetch";

/**
 * 복습 추천 조회
 */
export const fetchReviewRecommendations = async (): Promise<Review[]> => {
  try {
    const { data } = await customFetch.get<Review[]>("/reviews/recommendations");
    return data || [];
  } catch (error) {
    console.error('[fetchReviewRecommendations] Error:', error);
    return [];
  }
};
