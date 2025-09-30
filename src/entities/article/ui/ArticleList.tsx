"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import { useCustomRouter } from "@/shared/model/useCustomRouter";
import { Category } from "@/entities/category/types/category";
import { Article } from "@/entities/article/types/article";
import ArticleItem from "@/entities/article/ui/ArticleItem";
import { Tab } from "@/widgets/tabs/types/tab";
import { useState } from "react";
import { useGetArticles } from "../model/useGetArticles";

interface Props {
  articles: Article[];
  categories: Category[];
}

const ArticleList = ({ articles, categories }: Props) => {
  const tabs = categories.map((item) => ({
    name: item.name,
    value: `${item.id}`,
  }));
  const router = useCustomRouter();
  const [category, setCategory] = useState(tabs[0]);
  const { isLoading } = useGetArticles(category.value, articles);

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
      {articles.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-600 mb-2">
              아직 작성된 아티클이 없습니다
            </p>
            <p className="text-gray-500">
              곧 새로운 아티클이 업데이트될 예정입니다
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
          {articles.map((item) => (
            <ArticleItem data={item} key={item.id} isLoading={isLoading} />
          ))}
        </div>
      )}
    </>
  );
};

export default ArticleList;
