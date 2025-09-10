import axios from "axios";
import { Quiz } from "../types/quiz";

export const fetchQuiz = async (categoryId: string, mode: string, difficulty: string) => {
  try {
    const { data } = await axios.get<Quiz>(`${process.env.NEXT_PUBLIC_API_URL}/quizzes?categoryId=${categoryId}&mode=${mode}&difficulty=${difficulty}`);
    console.log("quiz: ", data);
    return data;
  } catch {
    return null;
  }
};
