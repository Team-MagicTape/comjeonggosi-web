"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import { NewspaperIcon } from "lucide-react";
import { ARTICLE_CATEGORY } from "../constants/article-category";
import { useArticleCategory } from "../model/useArticleCategory";
import { ARTICLES } from "@/entities/article/constants/dummy";
import ArticleItem from "@/entities/article/ui/ArticleItem";

const MainArticle = () => {
  const { category, handleCategory } = useArticleCategory();

  return (
    <div className="col-[1/9] h-150 row-[1/9] bg-white border border-border rounded-2xl p-8 flex flex-col gap-6 items-start">
      <div className="flex items-center gap-1">
        <NewspaperIcon />
        <h2 className="text-2xl font-bold">아티클</h2>
      </div>
      <Tabs
        tabs={ARTICLE_CATEGORY}
        selected={category}
        setSelected={handleCategory}
      />
      <div className="w-full grid grid-cols-2 gap-4">
        {ARTICLES.map((item) => (
          <ArticleItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default MainArticle;
