import { Category } from "@/entities/category/types/category";
import { QuizType } from "./quiz-type";

export interface Quiz {
  id: string;
  content: string;
  options: string[];
  answer: string;
  category: Category;
  articleId: number | null;
  type: QuizType;
}