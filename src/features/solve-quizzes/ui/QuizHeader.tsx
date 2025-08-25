"use client";
import Tabs from "@/widgets/tabs/ui/Tabs";
import { Tab } from "@/widgets/tabs/types/tab";

interface Props {
  category: Tab;
  tabs: Tab[]
  setCategory: (value: Tab) => void;
}

const QuizHeader = ({ category, tabs, setCategory }: Props) => {
  return (
    <div className="w-full mx-auto bg-white py-2 px-4 sm:py-3 sm:px-6 rounded-xl sm:rounded-2xl border border-gray-200">
      <Tabs tabs={tabs} selected={category} setSelected={setCategory} />
    </div>
  );
};

export default QuizHeader;