"use client";

import Tabs from "@/widgets/tabs/ui/Tabs";
import { useRouter } from "next/navigation";
import { Category } from "@/entities/category/types/category";
import { Article } from "@/entities/article/types/article";
import ArticleItem from "@/entities/article/ui/ArticleItem";

interface Props {
  articles: Article[];
  categories: Category[];
  selectedCategoryId: number;
}

const ArticleList = ({ articles, categories, selectedCategoryId }: Props) => {
  const router = useRouter();

  const handleCategoryChange = (category: Category) => {
    router.push(`?categoryId=${category.id}`);
  };

  return (
    <>
      <Tabs
        tabs={categories}
        selected={categories.find((c) => c.id === selectedCategoryId)!}
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
