import { Category } from "@/entities/category/types/category";

export interface Article {
  id: string;
  title: string;
  content: string;
  category: Category;
  author?: {
    id: string;
    nickname: string;
    profileImageUrl?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}