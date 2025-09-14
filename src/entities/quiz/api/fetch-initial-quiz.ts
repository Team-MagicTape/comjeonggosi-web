import { customFetch } from "@/shared/libs/custom-fetch";
import { Quiz } from "../types/quiz";
import { shuffleArray } from "@/features/solve-quizzes/utils/shuffle-array";

export const fetchInitialQuiz = async (categoryId: number) => {
  try{
    const { data } = await customFetch.get<Quiz>(`/quizzes?categoryId=${categoryId}&mode=RANDOM&difficulty=3`);
    const result = { ...data };
    result.options = shuffleArray([...data.options, data.answer]);
    return result;
  }catch(e){
    console.log(e);
    return null;
  }
}