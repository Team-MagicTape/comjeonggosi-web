"use client";

import { useState, ChangeEvent } from "react";
import { Category } from "@/entities/category/types/category";
import AdminCard from "@/widgets/admin/ui/AdminCard";
import { apiClient } from "@/shared/libs/custom-axios";
import { Plus, Minus, Loader2, CircleHelp, Hash } from "lucide-react";

interface Props {
  categories: Category[];
}

type QuizType = "MULTIPLE_CHOICE" | "OX" | "SHORT_ANSWER";

interface QuizData {
  content: string;
  answer: string;
  categoryId: string;
  articleId: string;
  difficulty: string;
  type: QuizType;
  explanation?: string;
}

const QuizCreator = ({ categories }: Props) => {
  const [data, setData] = useState<QuizData>({
    content: "",
    answer: "",
    categoryId: "",
    articleId: "",
    difficulty: "3",
    type: "MULTIPLE_CHOICE",
    explanation: "",
  });
  const [options, setOptions] = useState<string[]>(["", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    if (name === "type") {
      setData(prev => ({
        ...prev,
        [name]: value as QuizType,
        answer: value === "OX" ? "O" : "",
      }));

      if (value === "MULTIPLE_CHOICE") {
        setOptions(["", "", ""]);
      } else {
        setOptions([]);
      }
    } else {
      setData(prev => ({
        ...prev,
        [name]: name === "categoryId" || name === "articleId" ? Number(value) || value : value,
      }));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 3) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      let submitOptions: string[] = [];

      if (data.type === "MULTIPLE_CHOICE") {
        const filteredOptions = options.filter(option => option.trim() !== "");
        submitOptions = filteredOptions;
      } else if (data.type === "OX") {
        submitOptions = [data.answer === "O" ? "X" : "O"];
      }

      const submitData = {
        ...data,
        options: submitOptions,
        difficulty: Number(data.difficulty),
      };

      await apiClient.post("/api/admin/quizzes", submitData);
      
      setData({
        content: "",
        answer: "",
        categoryId: data.categoryId,
        articleId: "",
        difficulty: "3",
        type: data.type,
        explanation: "",
      });
      
      if (data.type === "MULTIPLE_CHOICE") {
        setOptions(["", "", ""]);
      }
      
      alert("퀴즈가 성공적으로 생성되었습니다!");
    } catch {
      alert("퀴즈 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                value={data.type}
                onChange={handleData}
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
                value={data.content}
                onChange={handleData}
                rows={4}
                placeholder="문제를 입력하세요..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                정답 <span className="text-red-500">*</span>
              </label>
              {data.type === "OX" ? (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value="O"
                      checked={data.answer === "O"}
                      onChange={handleData}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-green-600 font-medium">O (참)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value="X"
                      checked={data.answer === "X"}
                      onChange={handleData}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-red-600 font-medium">X (거짓)</span>
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  name="answer"
                  value={data.answer}
                  onChange={handleData}
                  placeholder={data.type === "MULTIPLE_CHOICE" ? "정답 텍스트를 입력하세요" : "정답을 입력하세요"}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              )}
            </div>

            {data.type === "MULTIPLE_CHOICE" && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    선택지 <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addOption}
                    disabled={options.length >= 6}
                    className="text-sm text-primary hover:text-primary/80 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-6">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder="선택지를 입력하세요"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                      {options.length > 3 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
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
                value={data.explanation}
                onChange={handleData}
                rows={3}
                placeholder="정답에 대한 해설을 입력하세요 (선택사항)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
              />
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
                value={data.categoryId}
                onChange={handleData}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <option value="">카테고리 선택</option>
                {categories.map(category => (
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
                  value={data.difficulty}
                  onChange={handleData}
                  className="flex-1"
                />
                <span className="w-8 text-center font-medium text-gray-700">
                  {data.difficulty}
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
                value={data.articleId}
                onChange={handleData}
                placeholder="아티클 ID (선택사항)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <button
            onClick={submit}
            disabled={
              isLoading ||
              !data.content.trim() ||
              !data.answer.trim() ||
              !data.categoryId ||
              (data.type === "MULTIPLE_CHOICE" && options.filter(opt => opt.trim()).length < 3)
            }
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isLoading ||
              !data.content.trim() ||
              !data.answer.trim() ||
              !data.categoryId ||
              (data.type === "MULTIPLE_CHOICE" && options.filter(opt => opt.trim()).length < 3)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                생성 중...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                퀴즈 생성
              </>
            )}
          </button>
        </AdminCard>
      </div>
    </div>
  );
};

export default QuizCreator;
