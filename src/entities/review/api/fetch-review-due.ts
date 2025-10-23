import { ReviewDueType } from "../types/review-due";
import { customFetch } from "@/shared/libs/custom-fetch";

export const fetchReviewDue = async (limit: number = 10) => {
    try {
      const { data } = await customFetch.get<ReviewDueType[]>(`/reviews/due?limit=${limit}`);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };