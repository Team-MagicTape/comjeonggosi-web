import { useState } from "react";
import { Category } from "@/entities/category/types/category";

export const useArticleCategory = (initialCategories: Category[]) => {
  const [category, setCategory] = useState<Category>(initialCategories[0]);

  const handleCategory = (category: Category) => {
    setCategory(category);
  };

  return {
    category,
    handleCategory,
  };
};
