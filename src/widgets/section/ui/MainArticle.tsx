"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import ArticleItem from "@/entities/article/ui/ArticleItem";
import { Category } from "@/entities/category/types/category";
import { Article } from "@/entities/article/types/article";
import { useGetArticles } from "@/entities/article/model/useGetArticles";
import { useArticleCategory } from "../model/useArticleCategory";
import CustomLink from "@/shared/ui/CustomLink";
import { ArrowRight } from "lucide-react";

interface Props {
  categories: Category[];
  initialData: Article[];
}

const MainArticle = ({ categories, initialData }: Props) => {
  const { category, categoryList, handleCategory } = useArticleCategory(categories);
  const { data, isLoading } = useGetArticles(category?.value || "0", initialData);

  return (
    <div className="w-full xl:min-w-214 xl:w-auto bg-white border border-gray-100 rounded-lg p-4 lg:p-6 flex flex-col gap-3 items-start">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg lg:text-xl font-semibold">아티클</h2>
        <CustomLink href="/articles" className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 group">
          전체보기
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </CustomLink>
      </div>
      <Tabs
        tabs={categoryList}
        selected={category}
        setSelected={handleCategory}
      />
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <ArticleItem key={idx} isLoading={true} />
          ))
        ) : data.length === 0 ? (
          <div className="col-span-2 py-8 text-center text-gray-500">
            아직 등록된 아티클이 없습니다.
          </div>
        ) : (
          data.map((item) => (
            <ArticleItem data={item} key={item.id} isLoading={false} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainArticle;
