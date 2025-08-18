import { Category } from "@/entities/category/types/category";
import { Tab } from "@/widgets/tabs/types/tab";
import { useState } from "react";

export const useArticleCategory = (categories: Category[]) => {
  const categoryList = categories.map(item => ({ name: item.name, value: `${item.id}` }));
  const [category, setCategory] = useState<Tab>(categoryList[0]);

  const handleCategory = (category: Tab) => {
    setCategory(category);
  }

  return {
    category,
    categoryList,
    handleCategory
  }
}