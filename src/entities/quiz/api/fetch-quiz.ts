import axios from "axios";
import { Quiz } from "../types/quiz";

export const fetchQuiz = async (categoryId: string, hidden?: string) => {
  try {
    const { data } = await axios.get<Quiz>(`/api/quizzes?categoryId=${categoryId}${hidden ? `&hidden=${hidden}` : ""}`);
    console.log("quiz: ", data);
    return data;
  } catch {
    return null;
  }
};
