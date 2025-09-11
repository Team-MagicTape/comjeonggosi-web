"use client";

import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import { apiClient } from "@/shared/libs/custom-axios";
import { editQuiz } from "@/widgets/edit-quiz-modal/libs/modal-controller";
import { Tab } from "@/widgets/tabs/types/tab";
import Tabs from "@/widgets/tabs/ui/Tabs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const EditQuizzes = () => {
  const [category, setCategory] = useState<Tab | null>(null);
  const [categoryList, setCategoryList] = useState<Tab[]>([]);

  const getCategory = async () => {
    try {
      const { data } = await apiClient.get<Category[]>("/api/categories");
      const categories = data.map((item) => ({
        name: item.name,
        value: `${item.id}`,
      }));
      setCategory(categories[0]);
      setCategoryList(categories);
    } catch {
      alert("카테고리 조회 실패");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const { data: quizzes } = useQuery({
    queryKey: ["quizzes", `${category?.value}`],
    queryFn: async () => {
      const { data } = await apiClient.get<Quiz[]>(
        `/api/admin/quizzes?categoryId=${category?.value || 1}`
      );
      return data;
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">퀴즈 목록</h2>
      <Tabs tabs={categoryList} selected={category} setSelected={setCategory} />
      <div className="grid gap-4 mt-4">
        {quizzes?.length === 0 && (
          <p className="text-gray-500">퀴즈가 없습니다.</p>
        )}
        {quizzes?.map((quiz) => (
          <div
            onClick={() => {
              editQuiz.open(quiz)
            }}
            key={quiz.id}
            className="flex items-center justify-between p-4 bg-white border shadow-sm cursor-pointer rounded-2xl"
          >
            <div>
              <p className="font-semibold">{quiz.content}</p>
              <p className="text-sm text-gray-500">{quiz.category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditQuizzes;
