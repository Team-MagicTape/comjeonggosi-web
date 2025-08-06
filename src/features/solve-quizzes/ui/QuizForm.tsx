"use client";

import { ARTICLE_CATEGORY } from "@/widgets/section/constants/article-category";
import { Tab } from "@/widgets/tabs/types/tab";
import Tabs from "@/widgets/tabs/ui/Tabs";
import { useState } from "react";

const QuizForm = () => {
  const [category, setCategory] = useState<Tab>({ name: "전체", value: "ALL" });
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <div className="w-full h-full flex flex-col gap-8 py-4">
      <div className="w-full px-6 bg-white py-6 rounded-2xl border border-border">
        <Tabs
          tabs={ARTICLE_CATEGORY}
          selected={category}
          setSelected={setCategory}
        />
        <button onClick={() => setCurrentIdx((prev) => prev - 1)}>prev</button>
        <button onClick={() => setCurrentIdx((prev) => prev + 1)}>next</button>
      </div>
      <div className="w-full overflow-x-hidden h-[calc(100vh-144px)]">
        <div
          className="w-min h-full flex items-center gap-12 xl:gap-0 transition-transform duration-500"
          style={{ transform: `translateX(calc(${currentIdx} * 100vw * -1))` }}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              className="w-screen px-4 xl:px-0 h-full flex justify-center"
              key={idx}
            >
              <div className="w-full max-w-200 rounded-item h-full bg-primary flex items-center">
                {idx}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
