"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { QuizType } from "@/entities/quiz/types/quiz-type";
import { createPortal } from "react-dom";
import { useEditQuizModal } from "../model/useEditQuizModal";
import { editQuiz } from "../libs/modal-controller";
import { apiClient } from "@/shared/libs/custom-axios";

const EditQuizModal = () => {
  const { value, visible, isClosing } = useEditQuizModal();
  const [data, setData] = useState({
    content: "",
    answer: "",
    categoryId: "",
    articleId: "",
    type: "MULTIPLE_CHOICE" as QuizType,
  });
  const [options, setOptions] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);

  // 모달이 열릴 때 기존 퀴즈 데이터로 초기화
  useEffect(() => {
    if (value && visible) {
      setData({
        content: value.content,
        answer: value.answer,
        categoryId: value.category.id.toString(),
        articleId: value.articleId?.toString() || "",
        type: value.type,
      });

      // options 설정
      if (value.type === "MULTIPLE_CHOICE") {
        setOptions(value.options.length > 0 ? value.options : [""]);
      } else if (value.type === "OX") {
        setOptions(value.options);
      } else {
        setOptions([]);
      }
    }
  }, [value, visible]);

  const handleData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value: inputValue, name } = e.target;

    if (name === "type") {
      setData((prev) => ({
        ...prev,
        [name]: inputValue as QuizType,
        answer: inputValue === "OX" ? "O" : "",
      }));

      if (inputValue === "MULTIPLE_CHOICE") {
        setOptions([""]);
      } else {
        setOptions([]);
      }
    } else {
      setData((prev) => ({
        ...prev,
        [name]:
          name === "categoryId" || name === "articleId"
            ? Number(inputValue) || inputValue
            : inputValue,
      }));
    }
  };

  const handleOptionChange = (index: number, optionValue: string) => {
    const newOptions = [...options];
    newOptions[index] = optionValue;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleClose = () => {
    editQuiz.close();
  };

  const submit = async () => {
    if (!value) return;

    if (!data.content.trim()) {
      alert("문제를 입력해주세요.");
      return;
    }
    if (!data.answer.trim()) {
      alert("정답을 입력해주세요.");
      return;
    }
    if (!data.categoryId) {
      alert("카테고리 ID를 입력해주세요.");
      return;
    }

    let submitOptions: string[] = [];

    if (data.type === "MULTIPLE_CHOICE") {
      const filteredOptions = options.filter((option) => option.trim() !== "");
      if (filteredOptions.length !== 3) {
        alert("객관식 문제는 정답 외에 3개의 오답 선택지를 입력해주세요.");
        return;
      }
      submitOptions = filteredOptions;
    } else if (data.type === "OX") {
      submitOptions = [data.answer === "O" ? "X" : "O"];
    } else if (data.type === "SHORT_ANSWER") {
      submitOptions = [];
    }

    setIsLoading(true);
    try {
      const submitData = {
        ...data,
        options: submitOptions,
      };
      await apiClient.patch(`/api/admin/quizzes/${value.id}`, submitData);
      alert("퀴즈 수정 성공");
      handleClose();
    } catch {
      alert("퀴즈 수정 실패");
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible && !isClosing) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        visible && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`max-w-2xl w-full mx-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
          visible && !isClosing ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">퀴즈 수정</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              퀴즈 타입 <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={data.type}
              onChange={handleData}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={isLoading}
            >
              <option value="MULTIPLE_CHOICE">객관식 (Multiple Choice)</option>
              <option value="OX">OX 문제</option>
              <option value="SHORT_ANSWER">단답형 (Short Answer)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {data.type === "MULTIPLE_CHOICE" &&
                "여러 선택지 중 하나를 고르는 문제"}
              {data.type === "OX" && "O 또는 X로 답하는 문제"}
              {data.type === "SHORT_ANSWER" && "짧은 답을 직접 입력하는 문제"}
            </p>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              문제 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              placeholder="퀴즈 문제를 입력하세요"
              name="content"
              value={data.content}
              onChange={handleData}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              정답 <span className="text-red-500">*</span>
            </label>
            {data.type === "OX" ? (
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="answer"
                    value="O"
                    checked={data.answer === "O"}
                    onChange={handleData}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <span className="text-lg font-medium text-green-600">
                    O (참)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="answer"
                    value="X"
                    checked={data.answer === "X"}
                    onChange={handleData}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <span className="text-lg font-medium text-red-600">
                    X (거짓)
                  </span>
                </label>
              </div>
            ) : (
              <input
                id="answer"
                type="text"
                placeholder={
                  data.type === "MULTIPLE_CHOICE"
                    ? "정답을 입력하세요 (선택지와는 별도)"
                    : "정답을 입력하세요"
                }
                name="answer"
                value={data.answer}
                onChange={handleData}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={isLoading}
              />
            )}
            {data.type === "MULTIPLE_CHOICE" && (
              <p className="text-xs text-gray-500 mt-1">
                정답은 선택지에 포함되지 않고 별도로 관리됩니다
              </p>
            )}
          </div>

          {data.type === "MULTIPLE_CHOICE" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  오답 선택지 <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addOption}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                  disabled={isLoading}
                >
                  + 추가
                </button>
              </div>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 w-6">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      placeholder={`오답 선택지 ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={isLoading}
                    />
                    {options.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="px-2 py-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        disabled={isLoading}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                정답 외에 3개의 오답 선택지가 필요합니다
              </p>
            </div>
          )}

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              카테고리 ID <span className="text-red-500">*</span>
            </label>
            <input
              id="categoryId"
              type="number"
              placeholder="카테고리 ID를 입력하세요"
              name="categoryId"
              value={data.categoryId}
              onChange={handleData}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="articleId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              아티클 ID
            </label>
            <input
              id="articleId"
              type="number"
              placeholder="아티클 ID를 입력하세요"
              name="articleId"
              value={data.articleId}
              onChange={handleData}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={submit}
            disabled={
              isLoading ||
              !data.content.trim() ||
              !data.answer.trim() ||
              !data.categoryId ||
              (data.type === "MULTIPLE_CHOICE" &&
                options.filter((opt) => opt.trim()).length < 3)
            }
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading ||
              !data.content.trim() ||
              !data.answer.trim() ||
              !data.categoryId ||
              (data.type === "MULTIPLE_CHOICE" &&
                options.filter((opt) => opt.trim()).length < 3)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                수정 중...
              </div>
            ) : (
              "퀴즈 수정"
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          * 필수 입력 항목
        </p>
      </div>
    </div>,
    document.body
  );
};

export default EditQuizModal;
