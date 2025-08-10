import { Settings } from "@/features/solve-quizzes/types/settings";
import { QUIZ_DATA } from "../constants/dummy";
import { useEffect, useState } from "react";
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

  const currentQuiz = QUIZ_DATA[currentIdx];
  const isCorrect = selectedAnswer
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

  useEffect(() => {
    window.history.pushState({}, "", `/quizzes/${currentQuiz.id}`);
  }, [currentQuiz.id]);

  return {
    category,
    setCategory,
    currentIdx,
    selectedAnswer,
    currentQuiz,
    showAnswer,
    handleAnswerSelect,
    isCorrect,
    handleNext,
    handlePrev,
    settings,
    handleSettingChange,
  };
};
