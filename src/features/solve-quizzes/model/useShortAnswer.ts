import { useEffect, useRef } from "react";

export const useShortAnswer = (
  showAnswer: boolean,
  quizIdx: number,
  currentIdx: number,
  isAnswered: boolean
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when active
  useEffect(() => {
    if (!showAnswer && quizIdx === currentIdx && !isAnswered) {
      inputRef.current?.focus();
    }
  }, [showAnswer, quizIdx, currentIdx, isAnswered]);

  return { inputRef };
};
