import { customFetch } from "@/shared/libs/custom-fetch";

/**
 * 복습 캘린더 조회
 */
export const fetchReviewDue = async (year: number, month?: number) => {
  try {
    const { data } = await customFetch.get(
      `/reviews/calendar?year=${year}&month=${month}`
    );
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
