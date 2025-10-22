import { customFetch } from "@/shared/libs/custom-fetch";
import { Mail } from "../types/mail";
import { GET_MY_QUESTIONS } from "@/shared/libs/graphql-queries";

interface MyQuestionsResponse {
  data: {
    myQuestions: Mail[];
  };
}

export const fetchInitialMails = async (): Promise<Mail[]> => {
  try {
    const { data } = await customFetch.post<MyQuestionsResponse>("/graphql", {
      query: GET_MY_QUESTIONS,
    });
    return data?.data?.myQuestions || [];
  } catch (error) {
    console.error('[fetchInitialMails] Error:', error);
    // 에러가 나도 빈 배열 반환으로 페이지는 정상 표시
    return [];
  }
};
