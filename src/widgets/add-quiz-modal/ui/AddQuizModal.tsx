"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/shared/libs/custom-axios";
import { GET_ALL_QUIZZES } from "@/shared/libs/graphql-queries";

interface Quiz {
  id: string;
  question: string;
  category: string;
  subcategory?: string;
  difficulty: string;
  tags: string[];
}

interface QuizListResponse {
  nodes: Quiz[];
  pageInfo: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface AddQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuiz: (quizId: string) => void;
  workbookId: string;
}

const AddQuizModal = ({
  isOpen,
  onClose,
  onSelectQuiz,
  workbookId,
}: AddQuizModalProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");

  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post(`/api/graphql`, {
        query: GET_ALL_QUIZZES,
        variables: {
          page,
          limit: 20,
          search: searchTerm || undefined,
          category: category || undefined,
        },
      });

      const data: QuizListResponse = res.data?.data?.quizzes;
      if (data) {
        setQuizzes(data.nodes);
        setTotalPages(data.pageInfo.totalPages);
      }
    } catch (error) {
      console.error("퀴즈 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadQuizzes();
    }
  }, [isOpen, page, searchTerm, category]);

  const handleSelect = (quizId: string) => {
    onSelectQuiz(quizId);
    onClose();
  };

  const handleSearch = () => {
    setPage(1);
    loadQuizzes();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold">퀴즈 추가</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="퀴즈 검색..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="카테고리"
              className="w-40 px-3 py-2 border border-gray-300 rounded"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              검색
            </button>
          </div>
        </div>

        {/* Quiz List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : quizzes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              퀴즈가 없습니다.
            </div>
          ) : (
            <div className="space-y-2">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="border border-gray-200 rounded p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelect(quiz.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-lg mb-2">
                        {quiz.question}
                      </p>
                      <div className="flex gap-2 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {quiz.category}
                        </span>
                        {quiz.subcategory && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {quiz.subcategory}
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded ${
                            quiz.difficulty === "EASY"
                              ? "bg-green-100 text-green-800"
                              : quiz.difficulty === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {quiz.difficulty}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-4">
                      ID: {quiz.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-sm text-gray-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizModal;
