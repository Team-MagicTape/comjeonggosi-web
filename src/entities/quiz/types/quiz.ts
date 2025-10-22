import { Category } from "@/entities/category/types/category";
import { QuizType, QuizDifficulty } from "./quiz-type";

// Server response 타입 (GraphQL에서 받는 그대로)
export interface QuizChoice {
  text: string;
  isCorrect: boolean;
}

export interface ServerQuiz {
  id: string; // GraphQL에서는 id로 옴
  type: QuizType;
  category: string;
  subcategory?: string;
  difficulty: QuizDifficulty;
  question: string;
  choices?: QuizChoice[];
  answer?: string;
  explanation?: string;
  tags: string[];
  source?: string;
  yearAppeared?: number | null;
  correctRate?: number;
  totalSubmissions?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Frontend에서 사용하는 타입 (기존 호환성 유지)
export interface Quiz {
  id: string;
  content: string; // question -> content 변환됨
  options?: string[]; // choices -> options 변환됨 (MULTIPLE_CHOICE만)
  answer: string;
  category: Category;
  articleId: string | null;
  type: QuizType;
  difficulty: number; // EASY=1, MEDIUM=3, HARD=5로 변환됨
  imageUrl?: string;
  explanation?: string;
}
