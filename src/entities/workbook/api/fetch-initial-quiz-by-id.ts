import { Quiz } from "@/entities/quiz/types/quiz";
import { customFetch } from "@/shared/libs/custom-fetch";

export const fetchInitialQuizById = async (quizId: string) => {
  try {
    const { data } = await customFetch.get<Quiz>(`/quizzes/${quizId}`);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
