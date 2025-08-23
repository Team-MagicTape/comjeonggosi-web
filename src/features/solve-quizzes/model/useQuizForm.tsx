import { Settings } from "@/features/solve-quizzes/types/settings";
import { useEffect, useMemo, useState } from "react";
import { Tab } from "@/widgets/tabs/types/tab";
import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import { fetchQuiz } from "@/entities/quiz/api/fetch-quiz";
import { solveQuizzes } from "../api/solve-quizzes";

export const useQuizForm = (
  categories: Category[],
  initialQuiz: Quiz | null
) => {
  const categoryList = categories.map((item) => ({
    name: item.name,
    value: `${item.id}`,
  }));
  const [category, setCategory] = useState<Tab>(categoryList[0]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    hide7Days: false,
    hideForever: false,
    autoNext: false,
    noDelay: false,
  });
  const [quizzes, setQuizzes] = useState<(Quiz | null)[]>(
    initialQuiz ? [initialQuiz] : []
  );

  const getQuizzes = async () => {
  if (!category) return;

  setQuizzes((prev) => [...prev, null]);

  const quiz = await fetchQuiz(
    category?.value || "",
    settings.hide7Days ? "7d" : settings.hideForever ? "forever" : undefined
  );

  if (quiz) {
    setQuizzes((prev) => {
      const newQuizzes = [...prev];
      const index = newQuizzes.lastIndexOf(null);
      if (index !== -1) {
        newQuizzes[index] = quiz;
      }
      return newQuizzes;
    });
  }
};


  const submit = async (selectedAnswer: string) => {
    const { isCorrect } = await solveQuizzes(
      currentQuiz?.id || "0",
      selectedAnswer
    );
    return isCorrect;
  };

  useEffect(() => {
    getQuizzes();
  }, [currentIdx]);

  useEffect(() => {
    setQuizzes([]);
    setCurrentIdx(0);
    getQuizzes();
  }, [category]);

  const currentQuiz = quizzes[currentIdx];
  const isCorrect = currentQuiz?.answer === selectedAnswer;

  const options = useMemo(() => {
    if (!currentQuiz) return [];
    const arr = [...currentQuiz.options, currentQuiz.answer];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentQuiz]);

  useEffect(() => {
    if (showAnswer && settings.autoNext) {
      let timer;
      if (settings.noDelay) {
        timer = setTimeout(() => {
          handleNext();
        }, 500);
      } else {
        timer = setTimeout(() => {
          handleNext();
        }, 3000);
      }

      return () => clearTimeout(timer);
    }
  }, [showAnswer, settings.autoNext]);

  const handleAnswerSelect = async (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    submit(answer);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);

    setTimeout(() => {
      if (currentIdx < quizzes.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      }
    }, 50);
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setSelectedAnswer(null);
      setShowAnswer(false);

      setTimeout(() => {
        setCurrentIdx((prev) => prev - 1);
      }, 100);
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
    quizzes,
    options,
  };
};
