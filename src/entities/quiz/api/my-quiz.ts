import { customFetch } from "@/shared/libs/custom-fetch";
import { Quiz } from "../types/quiz";

export const fetchMyQuizzes = async () => {
  try {
    const { data } = await customFetch.get<Quiz[]>("/my/quizzes");
    return data;
  } catch {
    return null;
  }
};
