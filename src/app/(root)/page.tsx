import { fetchInitialArticles } from "@/entities/article/api/fetch-initial-articles";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import MainArticle from "@/widgets/section/ui/MainArticle";
import MainMailApply from "@/widgets/section/ui/MainMailApply";
import MainQuiz from "@/widgets/section/ui/MainQuiz";

const Main = async () => {
  const categories = await fetchCategories();
  const selectedCategoryId = categories[0]?.id ?? 1;
  const initialArticles = await fetchInitialArticles(String(selectedCategoryId));

  return (
    <div className="flex flex-col xl:flex-row items-start justify-start gap-8">
      <MainArticle
        categories={categories}
        initialData={initialArticles}
        selectedCategoryId={selectedCategoryId}
      />
      <div className="w-full xl:w-auto flex-1 flex flex-col gap-8">
        <MainQuiz />
        <MainMailApply />
      </div>
    </div>
  );
};

export default Main;