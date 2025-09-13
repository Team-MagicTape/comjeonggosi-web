import { customFetch } from "@/shared/libs/custom-fetch";
import { Quiz } from "../types/quiz";

export const fetchInitialQuiz = async (categoryId: number) => {
  try{
    const { data } = await customFetch.get<Quiz>(`/quizzes?categoryId=${categoryId}&mode=RANDOM&difficulty=3`);
    console.log(data);
    return data;
  }catch(e){
    console.log(e);
    return null;
  }
}