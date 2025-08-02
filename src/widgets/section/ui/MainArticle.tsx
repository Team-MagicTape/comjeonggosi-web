"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import { ARTICLE_CATEGORY } from "../constants/article-category";
import { useArticleCategory } from "../model/useArticleCategory";
import { ARTICLES } from "@/entities/article/constants/dummy";
import ArticleItem from "@/entities/article/ui/ArticleItem";

const MainArticle = () => {
  const { category, handleCategory } = useArticleCategory();

  return (
    <div className="bg-white border border-border rounded-2xl p-4 xl:p-8 flex flex-col gap-6 items-start">
      <h2 className="text-xl xl:text-2xl font-bold">아티클</h2>
      <Tabs
        tabs={ARTICLE_CATEGORY}
        selected={category}
        setSelected={handleCategory}
      />
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
        {ARTICLES.map((item) => (
          <ArticleItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MainArticle;
