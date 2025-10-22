import { Category } from "@/entities/category/types/category";

export interface Article {
  id: string;
  title: string;
  content: string;
  category: Category;
  beforeArticles?: [
    {
      id: number;
      title: string;
    }
  ];
  afterArticles?: [
    {
      id: number;
      title: string;
    }
  ];
}
