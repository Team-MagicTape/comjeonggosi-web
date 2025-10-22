import { Quiz } from "@/entities/quiz/types/quiz";
import { apiClient } from "@/shared/libs/custom-axios";
import { GET_QUIZ_BY_ID } from "@/shared/libs/graphql-queries";

interface QuizResponse {
  data: {
    quiz: Quiz;
  };
}

export const fetchQuizById = async (quizId: string) => {
  try {
    const { data } = await apiClient.post<QuizResponse>("/api/graphql", {
      query: GET_QUIZ_BY_ID,
      variables: { id: quizId },
    });
    return data.data.quiz;
  } catch (e) {
    return null;
  }
};
