"use client";
import Tabs from "@/widgets/tabs/ui/Tabs";
import { ARTICLE_CATEGORY } from "@/widgets/section/constants/article-category";
import { Tab } from "@/widgets/tabs/types/tab";

interface Props {
  category: Tab;
  setCategory: (value: Tab) => void;
}

const QuizHeader = ({ category, setCategory }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg">
      <Tabs tabs={ARTICLE_CATEGORY} selected={category} setSelected={setCategory} />
    </div>
  );
};

export default QuizHeader;