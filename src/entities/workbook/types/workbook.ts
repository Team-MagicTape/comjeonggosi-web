import { User } from "@/entities/user/types/user";
import { Quiz } from "@/entities/quiz/types/quiz";

export interface Submission {
  id: string;
  userId: string;
  quizId: string;
  answer: string;
  isCorrected: boolean;
  timeTaken?: number;
  createdAt: string;
}

export interface Workbook {
  id: string;
  name: string;
  description: string;
  owner: User;
  quizzes?: Quiz[];
  quizCount: number;
  submissions?: Submission[];
  totalSubmissions: number;
  averageAccuracy: number;
  recentActivity?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
