"use client";

import { Quiz, ServerQuiz } from "@/entities/quiz/types/quiz";
import { Workbook } from "@/entities/workbook/types/workbook";
import { apiClient } from "@/shared/libs/custom-axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_WORKBOOK_QUIZZES } from "@/shared/libs/graphql-queries";
import { transformServerQuizToQuiz } from "@/shared/utils/transform-quiz";
import { addQuizToWorkbook } from "@/entities/workbook/api/add-quiz-to-workbook";
import AddQuizModal from "@/widgets/add-quiz-modal/ui/AddQuizModal";

const AdminWorkbookDetail = () => {
  const [workbook, setWorkbook] = useState<Workbook>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [newQuizId, setNewQuizId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const loadWorkbook = async () => {
    try {
      const { data } = await apiClient.get<Workbook>(
        `/api/admin/workbooks/${id}`
      );
      setWorkbook(data);

      // Load all quizzes via GraphQL (workbookQuizzes)
      try {
        const res = await apiClient.post(`/api/graphql`, {
          query: GET_WORKBOOK_QUIZZES,
          variables: { workbookId: id, page: 1, limit: 1000 },
        });

        const serverQuizzes: ServerQuiz[] =
          res.data?.data?.workbookQuizzes?.nodes || [];

        const transformed: Quiz[] = serverQuizzes.map((sq) =>
          transformServerQuizToQuiz(sq, {
            id: sq.category,
            name: sq.category,
            description: sq.subcategory || "",
            quizCount: 0,
            articleCount: 0,
            questionCount: 0,
            createdAt: "",
            updatedAt: "",
          })
        );

        setQuizzes(transformed);
      } catch (gqlErr) {
        console.error("워크북 퀴즈 로드 실패 (GraphQL):", gqlErr);
      }
    } catch (error) {
      console.error("워크북 로드 실패:", error);
      setWorkbook(undefined);
    }
  };

  const deleteQuiz = async (id: string) => {
    try {
      await apiClient.delete(
        `/api/workbooks/${workbook?.id || 0}/quizzes/${id}`
      );
      alert("퀴즈 삭제 성공");
    } catch {
      alert("퀴즈 삭제 실패");
    }
  };

  const handleAddQuiz = async () => {
    if (!newQuizId.trim()) {
      alert("퀴즈 ID를 입력해주세요.");
      return;
    }

    setIsAdding(true);
    try {
      await addQuizToWorkbook({
        workbookId: id,
        quizId: newQuizId.trim(),
      });
      alert("퀴즈가 성공적으로 추가되었습니다!");
      setNewQuizId("");
      // Reload quizzes
      await loadWorkbook();
    } catch (error: any) {
      alert(`퀴즈 추가 실패: ${error.message || "알 수 없는 오류"}`);
    } finally {
      setIsAdding(false);
    }
  };

  const handleSelectQuiz = async (quizId: string) => {
    setIsAdding(true);
    try {
      await addQuizToWorkbook({
        workbookId: id,
        quizId: quizId,
      });
      alert("퀴즈가 성공적으로 추가되었습니다!");
      await loadWorkbook();
    } catch (error: any) {
      alert(`퀴즈 추가 실패: ${error.message || "알 수 없는 오류"}`);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    loadWorkbook();
  }, []);

  return (
    <div className="w-full">
      <div>
        <p className="text-2xl">{workbook?.name}</p>
        <p>{workbook?.description}</p>
      </div>
      <hr className="text-gray my-4" />

      {/* Add Quiz Section */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          퀴즈 검색하여 추가
        </button>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={newQuizId}
            onChange={(e) => setNewQuizId(e.target.value)}
            placeholder="또는 퀴즈 ID 직접 입력"
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
            disabled={isAdding}
          />
          <button
            onClick={handleAddQuiz}
            disabled={isAdding}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
          >
            {isAdding ? "추가 중..." : "ID로 추가"}
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        {quizzes.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-center border-b border-gray"
          >
            <p className="flex-1">{item.content}</p>
            <p
              className="text-red-500 cursor-pointer"
              onClick={() => deleteQuiz(item.id)}
            >
              삭제
            </p>
          </div>
        ))}
      </div>

      <AddQuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectQuiz={handleSelectQuiz}
        workbookId={id}
      />
    </div>
  );
};

export default AdminWorkbookDetail;
