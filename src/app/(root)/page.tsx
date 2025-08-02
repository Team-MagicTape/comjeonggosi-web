import MainArticle from "@/widgets/section/ui/MainArticle";

const Main = () => {
  return (
    <div className="w-full grid grid-cols-12 grid-rows-8 gap-8">
      <MainArticle />

      <div className="col-[9/13] bg-white border border-border rounded-2xl p-8"></div>

      <div className="col-[9/13] bg-white border border-border rounded-2xl p-8"></div>
    </div>
  );
};

export default Main;
