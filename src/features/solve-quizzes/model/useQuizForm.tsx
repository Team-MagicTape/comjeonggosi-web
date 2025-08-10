import { Settings } from "@/features/solve-quizzes/types/settings";
import { useEffect, useState } from "react";
import { Tab } from "@/widgets/tabs/types/tab";
import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import { fetchQuiz } from "@/entities/quiz/api/fetch-quiz";
import { solveQuizzes } from "../api/solve-quizzes";

export const useQuizForm = (categories: Category[]) => {
  const categoryList = categories.map(item => ({ name: item.name, value: `${item.id}` }));
  const [category, setCategory] = useState<Tab>(categoryList[0]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    hide7Days: false,
    hideForever: false,
    autoNext: false,
  });
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const getQuizzes = async () => {
    const quiz = await fetchQuiz(category?.value || "");
    if(quiz) {
      setQuizzes(prev => ([...prev, quiz]));
    }
  }

  const submit = async (selectedAnswer: string) => {
    const { isCorrect } = await solveQuizzes(currentQuiz?.id || "0", selectedAnswer);
    return isCorrect;
  }

  useEffect(() => {
    getQuizzes();
  }, [currentIdx]);

  useEffect(() => {
    setQuizzes([]);
    setCurrentIdx(0);
  }, [category]);

  const currentQuiz: Quiz | undefined = quizzes[currentIdx];

  useEffect(() => {
    if (showAnswer && settings.autoNext) {
      const timer = setTimeout(() => {
        handleNext();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAnswer, settings.autoNext]);

  const handleAnswerSelect = async (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
    const isCorrect = await submit(currentQuiz.options[answerIndex]);
    setIsCorrect(isCorrect);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setIsCorrect(false);

    setTimeout(() => {
      if (currentIdx < quizzes.length - 1) {
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
      setIsCorrect(false);

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
    categoryList,
    quizzes
  };
};
