"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import { useCustomRouter } from "@/shared/model/useCustomRouter";
import { Category } from "@/entities/category/types/category";
import { Article } from "@/entities/article/types/article";
import ArticleItem from "@/entities/article/ui/ArticleItem";
import { Tab } from "@/widgets/tabs/types/tab";
import { useState } from "react";

interface Props {
  articles: Article[];
  categories: Category[];
  selectedCategoryId: number;
}

const ArticleList = ({ articles, categories, selectedCategoryId }: Props) => {
  const tabs = categories.map(item => ({ name: item.name, value: `${item.id}` }));
  const router = useCustomRouter();
  const [category, setCategory] = useState(tabs[0]);

  const handleCategoryChange = (tab: Tab) => {
    setCategory(tab);
    router.push(`?categoryId=${tab.value}`);
  };

  return (
    <>
      <Tabs
        tabs={tabs}
        selected={category}
        setSelected={handleCategoryChange}
      />
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
        {articles.map((item) => (
          <ArticleItem data={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default ArticleList;
