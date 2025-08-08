import { Settings } from "@/features/solve-quizzes/types/settings";
import { QUIZ_DATA } from "../constants/dummy";
import { useEffect, useState } from "react";
import { Quiz } from "@/entities/quiz/types/quiz";
import { Tab } from "@/widgets/tabs/types/tab";

export const useQuizForm = () => {
  const [category, setCategory] = useState<Tab>({ name: "전체", value: "ALL" });
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({
    hide7Days: false,
    hideForever: false,
    autoNext: false,
  });

  const currentQuiz: Quiz = QUIZ_DATA[currentIdx];
  const isCorrect: boolean = selectedAnswer
    ? currentQuiz.options[selectedAnswer] === currentQuiz?.answer
    : false;

  useEffect(() => {
    if (showAnswer && settings.autoNext) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        handleNext();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAnswer, settings.autoNext]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;

    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);

    setTimeout(() => {
      if (currentIdx < QUIZ_DATA.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setCurrentIdx(0);
      }
    }, 50);
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setSelectedAnswer(null);
      setShowAnswer(false);

      setTimeout(() => {
        setCurrentIdx((prev) => prev - 1);
      }, 50);
    }
  };

  const handleSettingChange = (setting: keyof Settings) => {
    if (setting === "hide7Days" && settings.hideForever) {
      setSettings((prev) => ({
        ...prev,
        hide7Days: !prev.hide7Days,
        hideForever: false,
      }));
      return;
    }
    if (setting === "hideForever" && settings.hide7Days) {
      setSettings((prev) => ({
        ...prev,
        hide7Days: false,
        hideForever: !prev.hideForever,
      }));
      return;
    }
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const getOptionLabel = (index: number): string => {
    return `${index + 1}`;
  };

  const getButtonStyle = (
    isCurrentQuiz: boolean,
    isSelected: boolean,
    isCorrectAnswer: boolean,
    showAnswer: boolean
  ): string => {
    let buttonStyle =
      "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100";

    if (isCurrentQuiz && showAnswer) {
      if (isCorrectAnswer) {
        buttonStyle = "border-green-500 bg-green-50";
      } else if (isSelected && !isCorrectAnswer) {
        buttonStyle = "border-red-500 bg-red-50";
      } else {
        buttonStyle = "border-gray-200 bg-gray-100";
      }
    } else if (isSelected && isCurrentQuiz) {
      buttonStyle = "border-blue-500 bg-blue-50 shadow-lg";
    }

    return buttonStyle;
  };

  const getOptionCircleStyle = (
    isCurrentQuiz: boolean,
    isSelected: boolean,
    isCorrectAnswer: boolean,
    showAnswer: boolean
  ): string => {
    if (isCurrentQuiz && showAnswer && isCorrectAnswer) {
      return "bg-green-600 text-white";
    }
    if (isCurrentQuiz && showAnswer && isSelected && !isCorrectAnswer) {
      return "bg-red-600 text-white";
    }
    if (isSelected && isCurrentQuiz && !showAnswer) {
      return "bg-blue-600 text-white";
    }
    return "bg-gray-300 text-gray-600";
  };

  const getOptionCircleContent = (
    isCurrentQuiz: boolean,
    isSelected: boolean,
    isCorrectAnswer: boolean,
    showAnswer: boolean,
    optionLabel: string
  ): string => {
    if (isCurrentQuiz && showAnswer && isCorrectAnswer) return "✓";
    if (isCurrentQuiz && showAnswer && isSelected && !isCorrectAnswer)
      return "✗";
    return optionLabel;
  };

  return {
    category,
    setCategory,
    currentIdx,
    selectedAnswer,
    currentQuiz,
    getOptionLabel,
    getButtonStyle,
    getOptionCircleStyle,
    getOptionCircleContent,
    showAnswer,
    handleAnswerSelect,
    isCorrect,
    handleNext,
    handlePrev,
    settings,
    handleSettingChange,
  };
};
