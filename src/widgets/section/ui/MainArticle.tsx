import ArticleList from "@/entities/article/ui/ArticleList";
import { fetchCategory } from "@/entities/category/api/fetch-category";
import { fetchArticles } from "@/entities/article/api/fetch-articles";
import { Category } from "@/entities/category/types/category";
import { Article } from "@/entities/article/types/article";

interface Props {
  Params?: { categoryId?: string };
  categories: Category[];
  initialData: Article[];
  selectedCategoryId: number;
}

const MainArticle = async ({ Params }: Props) => {
  const categories = await fetchCategory();
  const selectedCategoryId = Params?.categoryId
    ? parseInt(Params.categoryId)
    : 1;

  const articles = await fetchArticles(selectedCategoryId);

  return (
    <div className="w-full xl:min-w-214 xl:w-auto bg-white border border-border rounded-2xl p-4 xl:p-8 flex flex-col gap-6 items-start">
      <h2 className="text-xl xl:text-2xl font-bold">아티클</h2>
      <ArticleList
        articles={articles || []}
        categories={categories || []}
        selectedCategoryId={selectedCategoryId}
      />
    </div>
  );
};

export default MainArticle;
