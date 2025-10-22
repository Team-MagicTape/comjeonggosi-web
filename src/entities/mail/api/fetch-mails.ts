import { apiClient } from "@/shared/libs/custom-axios";
import { Mail } from "../types/mail";
import { GET_QUESTIONS } from "@/shared/libs/graphql-queries";

interface QuestionsResponse {
  data: {
    questions: Mail[];
  };
}

export const fetchMails = async (categoryId: string) => {
  try {
    const { data } = await apiClient.post<QuestionsResponse>("/api/graphql", {
      query: GET_QUESTIONS,
      variables: { categoryId },
    });
    return data.data.questions;
  } catch {
    return [];
  }
};
