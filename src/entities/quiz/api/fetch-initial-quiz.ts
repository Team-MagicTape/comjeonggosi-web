import { customFetch } from "@/shared/libs/custom-fetch";
import { Quiz } from "../types/quiz";

export const fetchInitialQuiz = async (categoryId: string) => {
  try{
    const { data } = await customFetch.get<Quiz>(`/quizzes?categoryId=${categoryId}&mode=RANDOM&difficulty=3&hideSolved=false`);
    return data;
  }catch(e){
    console.log(e);
    return null;
  }
}