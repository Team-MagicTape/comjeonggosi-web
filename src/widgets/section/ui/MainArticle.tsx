"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import { useArticleCategory } from "../model/useArticleCategory";
import ArticleItem from "@/entities/article/ui/ArticleItem";
import { Category } from "@/entities/category/types/category";
import { Article } from "@/entities/article/types/article";
import { useGetArticles } from "@/entities/article/model/useGetArticles";

interface Props {
  categories: Category[];
  initialData: Article[];
}

const MainArticle = ({ categories, initialData }: Props) => {
  const { category, categoryList, handleCategory } =
    useArticleCategory(categories);
  const { data, isLoading } = useGetArticles(
    category?.value || "0",
    initialData
  );

  return (
    <div className="w-full xl:min-w-214 xl:w-auto bg-white border border-border rounded-2xl p-4 xl:p-8 flex flex-col gap-6 items-start">
      <h2 className="text-xl xl:text-2xl font-bold">아티클</h2>
      <Tabs
        tabs={categoryList}
        selected={category}
        setSelected={handleCategory}
      />
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
        {!isLoading && !!data.length
          ? data.map((item) => <ArticleItem data={item} key={item.id} />)
          : Array.from({ length: 6 }).map((_, idx) => <ArticleItem key={idx} />)
        }
      </div>
    </div>
  );
};

export default MainArticle;
