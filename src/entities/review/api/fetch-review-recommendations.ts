import { Review } from "../types/review";
import { customFetch } from "@/shared/libs/custom-fetch";

/**
 * 복습 추천 조회
 */
export const fetchReviewRecommendations = async () => {
  try {
    const { data } = await customFetch.get<Review[]>(
      "/reviews/recommendations"
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
