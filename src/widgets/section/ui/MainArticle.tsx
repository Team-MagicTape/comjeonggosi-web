"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import ArticleItem from "@/entities/article/ui/ArticleItem";
import { Category } from "@/entities/category/types/category";
import { Article } from "@/entities/article/types/article";
import { useGetArticles } from "@/entities/article/model/useGetArticles";
import { useArticleCategory } from "../model/useArticleCategory";
import CustomLink from "@/shared/ui/CustomLink";

interface Props {
  categories: Category[];
  initialData: Article[];
}

const MainArticle = ({ categories, initialData }: Props) => {
  const { category, categoryList, handleCategory } = useArticleCategory(categories);
  const { data, isLoading } = useGetArticles(category?.value || "0", initialData);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">아티클</h2>
        <CustomLink href="/articles" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
          전체보기 →
        </CustomLink>
      </div>
      <Tabs
        tabs={categoryList}
        selected={category}
        setSelected={handleCategory}
      />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <ArticleItem key={idx} isLoading={true} />
          ))
        ) : data.length === 0 ? (
          <div className="col-span-2 py-12 text-center">
            <p className="text-gray-400 text-sm">아직 등록된 아티클이 없습니다</p>
          </div>
        ) : (
          data.slice(0,6).map((item) => (
            <ArticleItem data={item} key={item.id} isLoading={false} />
          ))
        )}
      </div>
    </div>
  );
};

export default MainArticle;
