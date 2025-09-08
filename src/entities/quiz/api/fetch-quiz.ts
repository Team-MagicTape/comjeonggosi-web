import axios from "axios";
import { Quiz } from "../types/quiz";

export const fetchQuiz = async (categoryId: string, hidden?: string) => {
  try {
    const { data } = await axios.get<Quiz>(`${process.env.NEXT_PUBLIC_API_URL}/quizzes?categoryId=${categoryId}${hidden ? `&hidden=${hidden}` : ""}`);
    console.log("quiz: ", data);
    return data;
  } catch {
    return null;
  }
};
