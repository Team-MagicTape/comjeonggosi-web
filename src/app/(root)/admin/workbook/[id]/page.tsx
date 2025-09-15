"use client";

import { Quiz } from "@/entities/quiz/types/quiz";
import { fetchWorkbookQuizzes } from "@/entities/workbook/api/fetch-workbook-quizzes";
import { Workbook } from "@/entities/workbook/types/workbook";
import { apiClient } from "@/shared/libs/custom-axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminWorkbookDetail = () => {
  const [workbook, setWorkbook] = useState<Workbook>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { id } = useParams<{ id: string }>();

  const loadWorkbook = async () => {
    try {
      const { data } = await apiClient.get<Workbook>(`/api/workbooks/${id}`);
      setWorkbook(data);
      const quiz = await fetchWorkbookQuizzes(data.quizIds);
      setQuizzes(quiz);
    } catch (error) {
      console.error("워크북 로드 실패:", error);
      setWorkbook(undefined);
    }
  };

  const deleteQuiz = async (id: string) => {
    try{
      await apiClient.delete(`/api/workbooks/${workbook?.id || 0}/quizzes/${id}`);
      alert("퀴즈 삭제 성공");
    }catch{
      alert("퀴즈 삭제 실패");
    }
  }

  useEffect(() => {
    loadWorkbook();
  }, []);

  return (
    <div className="w-full">
      <div>
        <p>{workbook?.name}</p>
        <p>{workbook?.description}</p>
      </div>
      <div className="w-full flex flex-row gap-2">
        {quizzes.map((item)=>(
          <div key={item.id} className="w-full flex items-center">
            <p>{item.content}</p>
            <p className="text-red-500 cursor-pointer" onClick={() => deleteQuiz(item.id)}>삭제</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWorkbookDetail;
