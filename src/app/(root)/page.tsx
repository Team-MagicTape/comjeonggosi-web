import MainArticle from "@/widgets/section/ui/MainArticle";
import MainMailApply from "@/widgets/section/ui/MainMailApply";
import MainQuizSearch from "@/widgets/section/ui/MainQuizSearch";

const Main = () => {
  return (
    <div className="flex flex-col xl:flex-row items-start justify-start gap-8">
      <MainArticle />
      <div className="w-full xl:w-auto flex-1 flex flex-col gap-8">
        <MainQuizSearch />
        <MainMailApply />
      </div>
    </div>
  );
};

export default Main;
