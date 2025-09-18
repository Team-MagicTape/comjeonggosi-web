"use client";

import { Quiz } from "@/entities/quiz/types/quiz";
import { Check, X } from "lucide-react";
import { useShortAnswer } from "../model/useShortAnswer";

interface Props {
  shortAnswer: string;
  setShortAnswer: (answer: string) => void;
  showAnswer: boolean;
  quizIdx: number;
  currentIdx: number;
  isCorrect: boolean;
  selectedAnswer: string | null;
  handleShortAnswerSubmit: () => void;
  quiz: Quiz;
  isAnswered?: boolean;
}

const ShortAnswer = ({
  shortAnswer,
  setShortAnswer,
  showAnswer,
  quizIdx,
  currentIdx,
  isCorrect,
  selectedAnswer,
  handleShortAnswerSubmit,
  quiz,
  isAnswered = false,
}: Props) => {
  const {inputRef} = useShortAnswer(showAnswer, quizIdx, currentIdx, isAnswered)
  return (
    <div className="px-4 pt-4 sm:px-8 mb-6 sm:mb-8">
      <div className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            disabled={showAnswer || quizIdx !== currentIdx || isAnswered}
            placeholder="정답을 입력하세요..."
            className={`
              w-full px-4 py-4 sm:px-6 sm:py-5 text-lg rounded-xl border-2 
              transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20
              ${
                showAnswer
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : selectedAnswer
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              }
              disabled:cursor-not-allowed
            `}
          />
          {showAnswer && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {isCorrect ? (
                <Check className="w-6 h-6 text-green-500" />
              ) : (
                <X className="w-6 h-6 text-red-500" />
              )}
            </div>
          )}
        </div>

        {!showAnswer && quizIdx === currentIdx && !isAnswered && (
          <button
            onClick={handleShortAnswerSubmit}
            disabled={!shortAnswer.trim()}
            className={`
              w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300
              ${
                shortAnswer.trim()
                  ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            정답 제출
          </button>
        )}

        {showAnswer && (
          <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">정답:</div>
            <div className="text-lg font-semibold text-gray-900">
              {quiz.answer}
            </div>
            {selectedAnswer && selectedAnswer !== quiz.answer && (
              <div className="mt-2">
                <div className="text-sm text-red-600 mb-1">당신의 답:</div>
                <div className="text-lg font-semibold text-red-600">
                  {selectedAnswer}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortAnswer;
