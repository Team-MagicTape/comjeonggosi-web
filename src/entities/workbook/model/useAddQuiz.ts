import { useCustomRouter } from "@/shared/model/useCustomRouter";
import { useState } from "react";

export const useAddQuiz = (workbookId: number) => {
  const [newQuizId, setNewQuizId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const router = useCustomRouter();
  const handleAddQuiz = async () => {
    if (!newQuizId.trim()) {
      alert("퀴즈 ID를 입력해주세요.");
      return;
    }

    setIsAdding(true);
    try {
      // API 호출로 퀴즈를 워크북에 추가
      const response = await fetch(`/api/workbook/${workbookId}/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId: newQuizId.trim() }),
        credentials: "include",
      });

      if (response.ok) {
        alert("퀴즈가 성공적으로 추가되었습니다!");
        setNewQuizId("");
        // 페이지 새로고침으로 업데이트된 데이터 반영
        router.refresh()
        
      } else {
        const error = await response.json();
        alert(`퀴즈 추가 실패: ${error.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("퀴즈 추가 중 오류:", error);
      alert("퀴즈 추가 중 오류가 발생했습니다.");
    } finally {
      setIsAdding(false);
    }
  };
  return {
    newQuizId,
    setNewQuizId,
    isAdding,
    handleAddQuiz
  }
};
