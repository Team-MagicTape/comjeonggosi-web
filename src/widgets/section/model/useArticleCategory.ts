import { Tab } from "@/widgets/tabs/types/tab"
import { useState } from "react"
import { ARTICLE_CATEGORY } from "../constants/article-category"

export const useArticleCategory = () => {
  const [category, setCategory] = useState<Tab>(ARTICLE_CATEGORY[0]);

  const handleCategory = (category: Tab) => {
    setCategory(category);
  }

  return {
    category,
    handleCategory
  }
}