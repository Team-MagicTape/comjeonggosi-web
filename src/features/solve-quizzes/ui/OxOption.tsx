"use client";

import { Quiz } from "@/entities/quiz/types/quiz";
import { getButtonStyle } from "../utils/get-button-style";
import { getOptionCircleStyle } from "../utils/get-option-circle-style";
import { Check, X } from "lucide-react";

interface Props {
  quiz: Quiz;
  selectedAnswer: string | null;
  quizIdx: number;
  currentIdx: number;
  showAnswer: boolean;
  handleAnswerSelect: (answer: string) => void;
  isAnswered?: boolean;
}

const OxOption = ({
  quiz,
  selectedAnswer,
  quizIdx,
  currentIdx,
  showAnswer,
  handleAnswerSelect,
  isAnswered = false,
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8 px-4 pt-4 sm:px-8">
      {["O", "X"].map((oxOption) => {
        const isCorrectAnswer = quiz.answer === oxOption;
        const isSelected = selectedAnswer === oxOption;

        return (
          <button
            key={oxOption}
            onClick={() =>
              quizIdx === currentIdx &&
              !showAnswer &&
              !isAnswered &&
              handleAnswerSelect(oxOption)
            }
            disabled={showAnswer || quizIdx !== currentIdx || isAnswered}
            className={`
              relative p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 
              flex flex-col items-center justify-center gap-3 min-h-[120px] sm:min-h-[140px]
              ${getButtonStyle(
                quizIdx === currentIdx,
                isSelected,
                isCorrectAnswer,
                showAnswer
              )}
            `}
          >
            <div
              className={`
                w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 flex items-center justify-center
                transition-all duration-300 text-2xl sm:text-3xl font-bold
                ${getOptionCircleStyle(
                  quizIdx === currentIdx,
                  isSelected,
                  isCorrectAnswer,
                  showAnswer
                )}
              `}
            >
              {showAnswer && isCorrectAnswer ? (
                <Check className="w-8 h-8 sm:w-10 sm:h-10" />
              ) : showAnswer && isSelected && !isCorrectAnswer ? (
                <X className="w-8 h-8 sm:w-10 sm:h-10" />
              ) : (
                oxOption
              )}
            </div>
            <span className="text-lg sm:text-xl font-semibold">
              {oxOption === "O" ? "맞음" : "틀림"}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OxOption;
