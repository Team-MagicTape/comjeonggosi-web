import { customFetch } from "@/shared/libs/custom-fetch";
import { Quiz } from "../types/quiz";

export const fetchInitialQuiz = async (categoryId: number) => {
  try{
    const { data } = await customFetch.get<Quiz>(`/api/quizzes?categoryId=${categoryId}`);
    return data;
  }catch{
    return null;
  }
}