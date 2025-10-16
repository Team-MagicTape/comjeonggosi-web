"use client";

import { Category } from "@/entities/category/types/category";
import AdminCard from "@/widgets/admin/ui/AdminCard";
import { bulkQuizzes } from "../api/bulk-quiz";
import { createQuizzes } from "../api/create-quiz";
import {
  Plus,
  Minus,
  Loader2,
  CircleHelp,
  Hash,
  Upload,
  X,
} from "lucide-react";
import { useQuizCreator } from "../model/useQuizCreator";

interface Props {
  categories: Category[];
}

const QuizCreator = ({ categories }: Props) => {
  const {
    quizForms,
    isLoading,
    setIsLoading,
    addQuizForm,
    removeQuizForm,
    handleData,
    handleOptionChange,
    addOption,
    removeOption,
    handleImageChange,
    removeImage,
    convertFormToApiData,
    resetForms,
    isAllFormsValid,
  } = useQuizCreator();

  const submit = async () => {
    setIsLoading(true);
    try {
      if (quizForms.length === 1) {
        await createQuizzes(convertFormToApiData(quizForms[0]));
      } else {
        const quizzesData = quizForms.map(convertFormToApiData);
        await bulkQuizzes(quizzesData);
      }
      resetForms();
      alert(`퀴즈가 성공적으로 생성되었습니다! (${quizForms.length}개)`);
    } catch (error) {
      alert("퀴즈 생성에 실패했습니다.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">퀴즈 생성</h1>
          {quizForms.length > 1 && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {quizForms.length}개
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={addQuizForm}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          퀴즈 추가
        </button>
      </div>

      {/* 퀴즈 폼들 */}
      {quizForms.map((formData, formIndex) => (
        <div
          key={formIndex}
          className="border-2 border-gray-200 rounded-xl p-6 relative bg-white shadow-sm"
        >
          {quizForms.length > 1 && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                #{formIndex + 1}
              </span>
              <button
                type="button"
                onClick={() => removeQuizForm(formIndex)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <AdminCard className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CircleHelp className="w-5 h-5" />
                  퀴즈 정보
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      퀴즈 타입 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={(e) => handleData(formIndex, e)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      <option value="MULTIPLE_CHOICE">객관식</option>
                      <option value="OX">O/X 문제</option>
                      <option value="SHORT_ANSWER">단답형</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      문제 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={(e) => handleData(formIndex, e)}
                      rows={4}
                      placeholder="문제를 입력하세요..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      정답 <span className="text-red-500">*</span>
                    </label>
                    {formData.type === "OX" ? (
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`answer-${formIndex}`}
                            value="O"
                            checked={formData.answer === "O"}
                            onChange={(e) => handleData(formIndex, e)}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-green-600 font-medium">
                            O (참)
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`answer-${formIndex}`}
                            value="X"
                            checked={formData.answer === "X"}
                            onChange={(e) => handleData(formIndex, e)}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-red-600 font-medium">
                            X (거짓)
                          </span>
                        </label>
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="answer"
                        value={formData.answer}
                        onChange={(e) => handleData(formIndex, e)}
                        placeholder={
                          formData.type === "MULTIPLE_CHOICE"
                            ? "정답 텍스트를 입력하세요"
                            : "정답을 입력하세요"
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>

                  {formData.type === "MULTIPLE_CHOICE" && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          선택지 <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => addOption(formIndex)}
                          disabled={formData.options.length >= 6}
                          className="text-sm text-primary hover:text-primary/80 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-500 w-6">
                              {optionIndex + 1}.
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  formIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              placeholder="선택지를 입력하세요"
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                            {formData.options.length > 3 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeOption(formIndex, optionIndex)
                                }
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        최소 3개, 최대 6개의 선택지 (정답 포함)
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      해설
                    </label>
                    <textarea
                      name="explanation"
                      value={formData.explanation}
                      onChange={(e) => handleData(formIndex, e)}
                      rows={3}
                      placeholder="정답에 대한 해설을 입력하세요 (선택사항)"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      이미지 첨부
                    </label>
                    {!formData.imagePreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(formIndex, e)}
                          className="hidden"
                          id={`image-upload-${formIndex}`}
                        />
                        <label
                          htmlFor={`image-upload-${formIndex}`}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              이미지를 선택하거나 여기에 드래그하세요
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF (최대 5MB)
                            </p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(formIndex)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </AdminCard>
            </div>

            <div className="space-y-6">
              <AdminCard className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  메타데이터
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={(e) => handleData(formIndex, e)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      <option value="">카테고리 선택</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      난이도
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        name="difficulty"
                        min="1"
                        max="5"
                        value={formData.difficulty}
                        onChange={(e) => handleData(formIndex, e)}
                        className="flex-1"
                      />
                      <span className="w-8 text-center font-medium text-gray-700">
                        {formData.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>쉬움</span>
                      <span>보통</span>
                      <span>어려움</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연관 아티클 ID
                    </label>
                    <input
                      type="number"
                      name="articleId"
                      value={formData.articleId}
                      onChange={(e) => handleData(formIndex, e)}
                      placeholder="아티클 ID (선택사항)"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </AdminCard>
            </div>
          </div>
        </div>
      ))}

      {/* 하단 생성 버튼 */}
      <AdminCard className="p-6 sticky bottom-6">
        <button
          onClick={submit}
          disabled={isLoading || !isAllFormsValid}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isLoading || !isAllFormsValid
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90 shadow-lg"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              {quizForms.length === 1
                ? "퀴즈 생성"
                : `${quizForms.length}개 퀴즈 일괄 생성`}
            </>
          )}
        </button>
      </AdminCard>
    </div>
  );
};

export default QuizCreator;