import { Tab } from "@/widgets/tabs/types/tab"
import { Category } from "@/entities/category/types/category";
import { useArticleCategoryStore } from "./useArticleCategoryStore";
import { useEffect } from "react";

export const useArticleCategory = (categories: Category[]) => {
  const categoryList = categories.map(item => ({ name: item.name, value: `${item.id}` }))
  const { category, setCategory } = useArticleCategoryStore();

  const handleCategory = (category: Tab) => {
    setCategory(category);
  }

  useEffect(() => {
    setCategory(categoryList[0]);
  }, []);

  return {
    category,
    handleCategory,
    categoryList
  }
}