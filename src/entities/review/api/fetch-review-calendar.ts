import { customFetch } from "@/shared/libs/custom-fetch";

/**
 * 복습 캘린더 조회
 */
export const fetchReviewDue = async (
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth()
) => {
  try {
    const { data } = await customFetch.get(
      `/reviews/calendar?year=${year}&month=${month}`
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
