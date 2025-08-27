"use client";

import { Article } from "@/entities/article/types/article";
import { Category } from "@/entities/category/types/category";
import { apiClient } from "@/shared/libs/custom-axios";
import { Tab } from "@/widgets/tabs/types/tab";
import Tabs from "@/widgets/tabs/ui/Tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const DeleteArticles = () => {
  const { invalidateQueries } = useQueryClient();
  const [category, setCategory] = useState<Tab | null>(null);
  const [categoryList, setCategoryList] = useState<Tab[]>([])

  const getCategory = async () => {
    try{
      const { data } = await apiClient.get<Category[]>("/api/categories");
      const categories = data.map(item => ({ name: item.name, value: `${item.id}` }));
      setCategory(categories[0]);
      setCategoryList(categories);
    }catch{
      alert("카테고리 조회 실패");
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  const { data: articles } = useQuery({
    queryKey: ['articles', `${category?.value}`],
    queryFn: async () => {
      const { data } = await apiClient.get<Article[]>(`/api/admin/articles?categoryId=${category?.value || 1}`);
      return data;
    },
  })

  const handleDelete = async (id: number) => {
    try{
      await apiClient.delete(`/api/admin/articles/${id}`);
      await invalidateQueries({ queryKey: ["articles", `${category?.value}`] });
      alert("삭제 완료");
    }catch(e){
      console.log(e);
      alert("삭제 실패");
    }
  };

  if(!category) {
    return null;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">아티클 목록</h2>
      <Tabs
        tabs={categoryList}
        selected={category}
        setSelected={setCategory}
      />
      <div className="grid gap-4">
        {articles?.length === 0 && (
          <p className="text-gray-500">아티클이 없습니다.</p>
        )}
        {articles?.map((article) => (
          <div
            key={article.id}
            className="flex justify-between items-center p-4 border rounded-2xl shadow-sm bg-white"
          >
            <div>
              <p className="font-semibold">{article.title}</p>
              <p className="text-sm text-gray-500">
                {article.category.name}
              </p>
            </div>
            <button
              onClick={() => handleDelete(article.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteArticles;
