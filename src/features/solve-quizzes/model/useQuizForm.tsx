import { useEffect, useMemo, useRef, useState } from "react";
import { Settings } from "@/features/solve-quizzes/types/settings";
import { Tab } from "@/widgets/tabs/types/tab";
import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import { fetchQuiz } from "@/entities/quiz/api/fetch-quiz";
import { solveQuizzes } from "../api/solve-quizzes";
import { login } from "@/widgets/login-modal/libs/modal-controller";
import { User } from "@/entities/user/types/user";

export const useQuizForm = (
  categories: Category[],
  initialQuiz: Quiz | null,
  user: User | null
) => {
  const categoryList: Tab[] = categories.map((item) => ({
    name: item.name,
    value: String(item.id),
  }));

  const [category, setCategory] = useState<Tab>(categoryList[0]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>(
    initialQuiz ? [initialQuiz] : []
  );
  const [shortAnswer, setShortAnswer] = useState("");
  const isInitialRender = useRef(true);

  const [settings, setSettings] = useState<Settings>({
    hide7Days: false,
    hideForever: false,
    autoNext: false,
    noDelay: false,
  });

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

  const submit = async (answer: string) => {
    const { isCorrect } = await solveQuizzes(currentQuiz?.id ?? "0", answer);
    return isCorrect;
  };

  const getQuizzes = async () => {
    if (!category) return;
    const hideMode = settings.hide7Days
      ? "7days"
      : settings.hideForever
      ? "forever"
      : undefined;

    const quiz = await fetchQuiz(category.value, hideMode);
    if (quiz) setQuizzes((prev) => [...prev, quiz]);
  };

  const handleAnswerSelect = async (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    submit(answer);
  };

  const handleShortAnswerSubmit = () => handleAnswerSelect(shortAnswer);

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeout(() => setCurrentIdx((prev) => prev + 1), 50);
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeout(() => setCurrentIdx((prev) => prev - 1), 100);
  };

  const handleSettingChange = (setting: keyof Settings) => {
    if (!user) {
      login.open();
      return;
    }
    if (setting === "hide7Days" && settings.hideForever) {
      return setSettings((prev) => ({
        ...prev,
        hide7Days: !prev.hide7Days,
        hideForever: false,
      }));
    }
    if (setting === "hideForever" && settings.hide7Days) {
      return setSettings((prev) => ({
        ...prev,
        hide7Days: false,
        hideForever: !prev.hideForever,
      }));
    }
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  useEffect(() => {
    if (currentIdx !== 0) getQuizzes();
    setShortAnswer("");
  }, [currentIdx, category]);

  useEffect(() => {
    if (!isInitialRender.current) {
      setQuizzes([]);
      setCurrentIdx(0);
    }
  }, [category]);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  const handleKeyboard = (e: KeyboardEvent) => {
    console.log(e.key);
    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
        handleAnswerSelect(options[Number(e.key) - 1]);
      }
      if (e.key === " ") {
        handleNext();
      }
    } else if (currentQuiz.type === "OX") {
      if (e.key === "o" || e.key === "O") {
        handleAnswerSelect("O");
      } else if (e.key === "x" || e.key === "X") {
        handleAnswerSelect("X");
      }
      if (e.key === " ") {
        handleNext();
      }
    } else if (currentQuiz.type === "SHORT_ANSWER") {
      if (e.key === "enter" && !e.isComposing) {
        handleShortAnswerSubmit().then(() => handleNext());
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    }
  }, []);

  useEffect(() => {
    if (!showAnswer || !settings.autoNext) return;
    const delay = settings.noDelay ? 500 : 3000;
    const timer = setTimeout(handleNext, delay);
    return () => clearTimeout(timer);
  }, [showAnswer, settings.autoNext, settings.noDelay]);

  return {
    category,
    setCategory,
    categoryList,
    currentIdx,
    currentQuiz,
    quizzes,
    options,
    selectedAnswer,
    showAnswer,
    isCorrect,
    handleAnswerSelect,
    handleShortAnswerSubmit,
    shortAnswer,
    setShortAnswer,
    handleNext,
    handlePrev,
    settings,
    handleSettingChange,
  };
};
