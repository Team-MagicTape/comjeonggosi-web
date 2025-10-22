export interface Category {
  id: string;
  name: string;
  description: string;
  quizCount?: number;
  articleCount?: number;
  questionCount?: number;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}