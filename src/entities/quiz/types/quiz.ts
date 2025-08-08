import { Category } from "@/entities/category/types/category";

export interface Quiz {
  id: string;
  content: string;
  options: string[];
  answer: string;
  category: Category;
}