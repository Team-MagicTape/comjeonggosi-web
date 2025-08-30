"use client";

import { Category } from "@/entities/category/types/category";
import { useGetMails } from "@/entities/mail/model/useGetMails";
import { Mail } from "@/entities/mail/types/mail";
import TodayQuestionItem from "./TodayQuestionItem";
import Tabs from "@/widgets/tabs/ui/Tabs";

interface Props {
  categories: Category[];
  questions: Mail[];
}

const TodayQuestions = ({ categories, questions }: Props) => {
  const { data, category, categoryList, setCategory } = useGetMails(
    categories,
    questions
  );

  return (
    <div>
      <div className="flex flex-col gap-2 left-0">
        <div className="font-extrabold text-4xl">오늘의 질문</div>
        <div className="text-[16px] font-bold mb-[40px] text-[#b7b7b7]">
          매일 새로운 질문으로 생각의 깊이를 더해보세요
        </div>
      </div>
      <div className="w-full mx-auto bg-white py-2 px-4 sm:py-3 sm:px-6 rounded-xl sm:rounded-2xl border border-gray-200 mb-4">
        <Tabs tabs={categoryList} selected={category} setSelected={setCategory} />
      </div>
      <div className="gap-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <TodayQuestionItem
            data={item}
            category={categories.find((c) => c.id === item.id) || null}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayQuestions;
