import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const modeList = [
    { name: "랜덤퀴즈", value: "RANDOM" },
    { name: "추천퀴즈", value: "RECOMMEND" },
    { name: "복습퀴즈", value: "REVIEW" },
    { name: "약점보강퀴즈", value: "WEAKNESS" },
  ];

  const [category, setCategory] = useState<Tab>(categoryList[0]);
  const [mode, setMode] = useState<Tab>(modeList[0]);
  const [difficulty, setDifficulty] = useState(3);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>(
    initialQuiz ? [initialQuiz] : []
  );
  const [shortAnswer, setShortAnswer] = useState("");
  const isInitialRender = useRef(true);
  const [answeredQuizzes, setAnsweredQuizzes] = useState<
    Map<number, { answer: string; isCorrect: boolean }>
  >(new Map());

  const [settings, setSettings] = useState<Settings>({
    hideSolved: false,
    autoNext: false,
    noDelay: false,
  });

  const currentQuiz = quizzes[currentIdx];
  const isCorrect = currentQuiz?.answer === selectedAnswer;
  const isCurrentQuizAnswered = answeredQuizzes.has(currentIdx);

  const submit = async (answer: string) => {
    const { isCorrect } = await solveQuizzes(currentQuiz?.id ?? "0", answer);
    return isCorrect;
  };

  const getQuizzes = useCallback(async () => {
    if (!category) return;
    const quiz = await fetchQuiz(
      category.value,
      mode.value,
      `${difficulty}`,
      settings.hideSolved
    );
    if (quiz) {
      setQuizzes((prev) => [...prev, quiz]);
    }
  }, [category, mode, difficulty]);

  const handleAnswerSelect = async (answer: string) => {
    if (showAnswer || isCurrentQuizAnswered) return;
    const correct = currentQuiz?.answer === answer;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    // 답변 상태를 저장
    setAnsweredQuizzes((prev) =>
      new Map(prev).set(currentIdx, { answer, isCorrect: correct })
    );
    submit(answer);
  };

  const handleShortAnswerSubmit = () => handleAnswerSelect(shortAnswer);

  const handleNext = () => {
    if (!selectedAnswer || !showAnswer) return;

    const nextQuizAnswer = answeredQuizzes.get(currentIdx + 1);
    if (nextQuizAnswer) {
      // 다음 문제가 답변되어 있다면 해당 답변으로 설정
      setSelectedAnswer(nextQuizAnswer.answer);
      setShowAnswer(true);
    } else {
      // 답변되지 않은 문제라면 초기화
      setSelectedAnswer(null);
      setShowAnswer(false);
    }

    setTimeout(() => setCurrentIdx((prev) => prev + 1), 50);
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;

    const prevQuizAnswer = answeredQuizzes.get(currentIdx - 1);
    if (prevQuizAnswer) {
      // 이전 문제가 답변되어 있다면 해당 답변으로 설정
      setSelectedAnswer(prevQuizAnswer.answer);
      setShowAnswer(true);
    } else {
      // 답변되지 않은 문제라면 초기화
      setSelectedAnswer(null);
      setShowAnswer(false);
    }

    setShortAnswer("");
    setTimeout(() => setCurrentIdx((prev) => prev - 1), 100);
  };

  const handleSettingChange = (setting: keyof Settings) => {
    if (!user) {
      login.open();
      return;
    }
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  useEffect(() => {
    if (currentIdx !== 0) getQuizzes();
    setShortAnswer("");
  }, [currentIdx, category]);

  useEffect(() => {
    if (quizzes.length === 0 && currentIdx === 0) {
      getQuizzes();
    }
  }, [currentIdx, quizzes.length, getQuizzes]);

  useEffect(() => {
    if (!isInitialRender.current) {
      setQuizzes([]);
      setCurrentIdx(0);
      setAnsweredQuizzes(new Map());
    }
  }, [category]);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  const handleKeyboard = (e: KeyboardEvent) => {
    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
        handleAnswerSelect(currentQuiz.options[Number(e.key) - 1]);
      }
      if (e.key === " " && showAnswer) {
        handleNext();
      }
    } else if (currentQuiz.type === "OX") {
      if (e.key === "o" || e.key === "O" || e.key === "1") {
        handleAnswerSelect("O");
      } else if (e.key === "x" || e.key === "X" || e.key === "2") {
        handleAnswerSelect("X");
      }
      if (e.key === " " && showAnswer) {
        handleNext();
      }
    } else if (currentQuiz.type === "SHORT_ANSWER") {
      if (e.key === "Enter" && !e.isComposing) {
        handleShortAnswerSubmit();
      }
      if (e.key === " " && showAnswer) {
        handleNext();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [currentQuiz, showAnswer, shortAnswer, isCurrentQuizAnswered]);

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
    modeList,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    isCurrentQuizAnswered,
  };
};
