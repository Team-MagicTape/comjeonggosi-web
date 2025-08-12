import { Tab } from "@/widgets/tabs/types/tab"
import { useState } from "react"
import { Category } from "@/entities/category/types/category";

export const useArticleCategory = (categories: Category[]) => {
  const categoryList = categories.map(item => ({ name: item.name, value: `${item.id}` }))
  const [category, setCategory] = useState<Tab>(categoryList[0]);

  const handleCategory = (category: Tab) => {
    setCategory(category);
  }

  return {
    category,
    handleCategory,
    categoryList
  }
}