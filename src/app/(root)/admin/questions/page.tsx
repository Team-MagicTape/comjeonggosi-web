"use client";

import { apiClient } from "@/shared/libs/custom-axios";
import { ChangeEvent, useState } from "react";

const CreateQuestion = () => {
  const [question, setQuestion] = useState({
    title: "",
    content: "",
    answer: "",
    day: "1",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleQuestion = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (
      !question.title.trim() ||
      !question.answer.trim() ||
      !question.categoryId.trim() ||
      !question.content.trim() ||
      !question.day.trim()
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("/api/admin/questions", question);
      alert("질문 생성 성공");
      setQuestion({
        title: "",
        content: "",
        answer: "",
        day: "1",
        categoryId: "",
      });
    } catch (error) {
      alert("질문 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          새 질문 만들기
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={question.title}
              onChange={handleQuestion}
              placeholder="질문 제목을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2">
              질문 내용 *
            </label>
            <textarea
              id="content"
              name="content"
              value={question.content}
              onChange={handleQuestion}
              rows={4}
              placeholder="질문 내용을 상세히 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700 mb-2">
              답변 *
            </label>
            <textarea
              id="answer"
              name="answer"
              value={question.answer}
              onChange={handleQuestion}
              rows={4}
              placeholder="정답을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700 mb-2">
                출제일차 *
              </label>
              <input
                type="number"
                id="day"
                name="day"
                value={question.day}
                onChange={handleQuestion}
                min={1}
                placeholder="출제일차를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 ID *
              </label>
              <input
                type="text"
                id="categoryId"
                name="categoryId"
                value={question.categoryId}
                onChange={handleQuestion}
                placeholder="카테고리 ID를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none outline-none"
              />
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="pt-4">
            <button
              onClick={submit}
              disabled={loading}
              className={`w-full px-4 py-2 text-white font-medium rounded-md transition-colors ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              }`}>
              {loading ? "생성 중..." : "질문 생성"}
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CreateQuestion;
