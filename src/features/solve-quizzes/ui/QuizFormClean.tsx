"use client";

import { useQuizForm } from "../model/useQuizForm";
import OptionButton from "@/features/solve-quizzes/ui/OptionButton";
import { getButtonStyle } from "../utils/get-button-style";
import { getOptionCircleStyle } from "../utils/get-option-circle-style";
import { getOptionCircleContent } from "../utils/get-option-circle-content";
import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import { User } from "@/entities/user/types/user";
import { ChevronLeft, ChevronRight, Settings2 } from "lucide-react";
import { useState } from "react";
import ChatBot from "@/entities/chatBot/ui/ChatBot";

interface Props {
  categories: Category[];
  initialQuiz: Quiz | null;
  user: User | null;
  categoryId: string;
}

const QuizFormClean = ({ categories, initialQuiz, user, categoryId }: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    category,
    setCategory,
    currentIdx,
    selectedAnswer,
    showAnswer,
    handleAnswerSelect,
    isCorrect,
    handleNext,
    handlePrev,
    settings,
    handleSettingChange,
    categoryList,
    quizzes,
    handleShortAnswerSubmit,
    shortAnswer,
    setShortAnswer,
    modeList,
    setMode,
    mode,
    difficulty,
    setDifficulty,
    isCurrentQuizAnswered,
  } = useQuizForm(categories, initialQuiz, user, categoryId);

  const currentQuiz = quizzes[currentIdx];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 상단 컨트롤 바 */}
      <div className="border-b border-gray-200 px-4 md:px-6 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {/* 왼쪽: 진행률 */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                {currentIdx + 1} <span className="text-gray-400">/</span> {quizzes.length}
              </span>
            </div>

            {/* 중앙: 카테고리 */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{category.name}</span>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              >
                <Settings2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* 오른쪽: 공백 */}
            <div className="w-20"></div>
          </div>

          {/* 진행 바 */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff8f63] transition-all duration-300 ease-out"
              style={{ width: `${((currentIdx + 1) / quizzes.length) * 100}%` }}
            />
          </div>

          {/* 설정 패널 */}
          {showSettings && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={category.value}
                  onChange={(e) => {
                    const selected = categoryList.find(cat => cat.value === e.target.value);
                    if (selected) setCategory(selected);
                  }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#ff8f63]"
                >
                  {categoryList.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#ff8f63]"
                >
                  <option value="1">쉬움</option>
                  <option value="3">보통</option>
                  <option value="5">어려움</option>
                </select>

                <select
                  value={mode.value}
                  onChange={(e) => {
                    const selected = modeList.find(m => m.value === e.target.value);
                    if (selected) setMode(selected);
                  }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#ff8f63]"
                >
                  {modeList.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={settings.hideSolved}
                  onChange={() => handleSettingChange("hideSolved")}
                  className="w-4 h-4 text-[#ff8f63] border-gray-300 rounded focus:ring-[#ff8f63]"
                />
                <span className="text-sm text-gray-600">푼 문제 숨기기</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* 메인 퀴즈 영역 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto py-6 md:py-10 px-4 md:px-6">
          {currentQuiz ? (
            <div className="space-y-6">
              {/* 문제 */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
                  {currentQuiz.content}
                </h2>
              </div>

              {/* 이미지 */}
              {currentQuiz.imageUrl && (
                <div className="my-6">
                  <img
                    src={currentQuiz.imageUrl}
                    alt="퀴즈 이미지"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {/* 선택지 */}
              <div className="mt-8">
                {currentQuiz.type === "TRUE_FALSE" ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {["O", "X"].map((option, idx) => {
                        // O/X를 true/false로 변환해서 비교
                        const normalizedOption = option === "O" ? "true" : "false";
                        const normalizedAnswer = currentQuiz.answer?.toLowerCase();
                        const isCorrectAnswer = normalizedAnswer === normalizedOption;
                        
                        return (
                          <OptionButton
                            key={idx}
                            option={option}
                            optionIdx={idx}
                            isCurrentQuiz={true}
                            buttonStyle={getButtonStyle(
                              true,
                              selectedAnswer === option,
                              isCorrectAnswer,
                              showAnswer
                            )}
                            circleStyle={getOptionCircleStyle(
                              true,
                              selectedAnswer === option,
                              isCorrectAnswer,
                              showAnswer
                            )}
                            circleContent={getOptionCircleContent(
                              true,
                              selectedAnswer === option,
                              isCorrectAnswer,
                              showAnswer,
                              option
                            )}
                            showAnswer={showAnswer}
                            handleAnswerSelect={handleAnswerSelect}
                            selectedAnswer={selectedAnswer}
                            explanation="" // O/X는 개별 해설 제거
                          />
                        );
                      })}
                    </div>
                  </>
                ) : currentQuiz.type === "SHORT_ANSWER" ? (
                  <div>
                    <input
                      type="text"
                      value={shortAnswer}
                      onChange={(e) => setShortAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !showAnswer && shortAnswer.trim()) {
                          handleShortAnswerSubmit();
                        }
                      }}
                      placeholder="답을 입력하세요"
                      disabled={showAnswer}
                      className="w-full px-5 py-3.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8f63] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {currentQuiz.options?.map((option, optionIdx) => {
                      const isCorrectAnswer = currentQuiz.answer === option;
                      const optionLabels = ["A", "B", "C", "D", "E", "F"];

                      return (
                        <OptionButton
                          key={optionIdx}
                          option={option}
                          optionIdx={optionIdx}
                          isCurrentQuiz={true}
                          buttonStyle={getButtonStyle(
                            true,
                            selectedAnswer === option,
                            isCorrectAnswer,
                            showAnswer
                          )}
                          circleStyle={getOptionCircleStyle(
                            true,
                            selectedAnswer === option,
                            isCorrectAnswer,
                            showAnswer
                          )}
                          circleContent={getOptionCircleContent(
                            true,
                            selectedAnswer === option,
                            isCorrectAnswer,
                            showAnswer,
                            optionLabels[optionIdx] || `${optionIdx + 1}`
                          )}
                          showAnswer={showAnswer}
                          handleAnswerSelect={handleAnswerSelect}
                          selectedAnswer={selectedAnswer}
                          explanation=""
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 제출 버튼 */}
              {!showAnswer && (
                (selectedAnswer && currentQuiz.type !== "SHORT_ANSWER") ||
                (currentQuiz.type === "SHORT_ANSWER" && shortAnswer.trim())
              ) && (
                <button
                  onClick={() => {
                    if (currentQuiz.type === "SHORT_ANSWER") {
                      handleShortAnswerSubmit();
                    } else if (selectedAnswer) {
                      handleAnswerSelect(selectedAnswer);
                    }
                  }}
                  className="w-full py-3.5 bg-[#ff8f63] hover:bg-[#ff7a4d] text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  제출하기
                </button>
              )}

              {/* 해설 */}
              {showAnswer && (
                <div className="mt-6">
                  {currentQuiz.explanation && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">
                          해설
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {currentQuiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  퀴즈를 준비중입니다
                </h3>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-[#ff8f63] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#ff8f63] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#ff8f63] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      {currentQuiz && (
        <div className="border-t border-gray-200 px-4 md:px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>이전</span>
            </button>

            {showAnswer && (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#ff8f63] hover:bg-[#ff7a4d] text-white font-semibold rounded-lg transition-colors shadow-sm"
              >
                <span>다음 문제</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!showAnswer}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <span>다음</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <ChatBot />
    </div>
  );
};

export default QuizFormClean;
