import { Review } from "../types/review";
import { customFetch } from "@/shared/libs/custom-fetch";

/**
 * 복습 추천 조회
 */
export const fetchReviewRecommandations = async () => {
  try {
    const { data } = await customFetch.get<Review[]>(
      "/reviews/recommandations"
    );
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
