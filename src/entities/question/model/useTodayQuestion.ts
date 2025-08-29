import { fetchQuestionById } from "../api/fetch-initial-question";
import { fetchCategories } from "@/entities/category/api/fetch-categories";

export const useTodayQuestion = async (questionId: number) => {
  const question = await fetchQuestionById(questionId);
  if (!question) return null;

  const categories = await fetchCategories();
  const category = categories.find((c) => c.id === question.categoryId);

  return { question, category };
};
