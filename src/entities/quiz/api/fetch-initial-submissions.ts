import { customFetch } from "@/shared/libs/custom-fetch";
import { MySubmission } from "../types/my-submission";
import { GET_MY_SUBMISSIONS } from "@/shared/libs/graphql-queries";

interface MySubmissionsResponse {
  data: {
    mySubmissions: MySubmission[];
  };
}

export const fetchInitialSubmissions = async (): Promise<MySubmission[]> => {
  try {
    const { data } = await customFetch.post<MySubmissionsResponse>("/graphql", {
      query: GET_MY_SUBMISSIONS,
    });
    return data?.data?.mySubmissions || [];
  } catch (error) {
    console.error('[fetchInitialSubmissions] Error:', error);
    // 에러가 나도 빈 배열 반환으로 페이지는 정상 표시
    return [];
  }
};
