import { fetchInitialArticles } from "@/entities/article/api/fetch-initial-articles";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import MainArticle from "@/widgets/section/ui/MainArticle";
import MainMailApply from "@/widgets/section/ui/MainMailApply";
import MainQuiz from "@/widgets/section/ui/MainQuiz";
import StreakForm from "@/entities/streak/ui/StreakForm";
import { fetchUser } from "@/entities/user/api/fetch-user";
import MainNotice from "@/entities/notices/ui/MainNotice";

const Main = async () => {
  const categories = await fetchCategories();
  const initialArticles = await fetchInitialArticles(
    `${categories[0]?.id || 0}`
  );
  const user = await fetchUser();

  return (
    <div className="w-full py-4 lg:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <MainArticle categories={categories} initialData={initialArticles} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          {user && <StreakForm/>}
          <MainQuiz />
          <MainMailApply />
          <MainNotice />
        </div>
      </div>
    </div>
  );
};

export default Main;
