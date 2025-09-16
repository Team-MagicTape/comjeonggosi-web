import { fetchInitialArticles } from "@/entities/article/api/fetch-initial-articles";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import MainArticle from "@/widgets/section/ui/MainArticle";
import MainMailApply from "@/widgets/section/ui/MainMailApply";
import MainQuiz from "@/widgets/section/ui/MainQuiz";

const Main = async () => {
  const categories = await fetchCategories();
  const initialArticles = await fetchInitialArticles(
    `${categories[0]?.id || 0}`
  );
  

  return (
    <div className="flex flex-col lg:flex-row items-start justify-start gap-4 py-2 lg:py-4">
      <MainArticle categories={categories} initialData={initialArticles} />
      <div className="w-full lg:w-auto flex-1 flex flex-col gap-4">
        <MainQuiz />
        <MainMailApply />
      </div>
    </div>
  );
};

export default Main;
