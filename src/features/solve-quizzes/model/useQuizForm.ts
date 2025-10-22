import { useCallback, useEffect, useRef, useState } from "react";
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

  const normalizeAnswer = useCallback((answer: string | null | undefined) => {
    if (!answer) return "";
    
    // O/X를 true/false로 변환
    const normalized = answer.replace(/\s+/g, "").toLowerCase();
    if (normalized === "o" || normalized === "true") return "true";
    if (normalized === "x" || normalized === "false") return "false";
    
    return normalized;
  }, []);

  const currentQuiz = quizzes[currentIdx];
  const isCorrect =
    normalizeAnswer(selectedAnswer) === normalizeAnswer(currentQuiz?.answer);
  const isCurrentQuizAnswered = answeredQuizzes.has(currentIdx);

  const submit = async (answer: string) => {
    const result = await solveQuizzes(currentQuiz?.id ?? "0", answer);
    if (!result) {
      console.error("Quiz submission failed");
      return false;
    }
    // 서버 응답이 { score, correctAnswers, totalQuestions } 형태이므로
    // 정답 여부는 로컬에서 판단
    const correct = normalizeAnswer(answer) === normalizeAnswer(currentQuiz?.answer);
    return correct;
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
  }, [category, mode, difficulty, settings.hideSolved]);

  const handleAnswerSelect = async (answer: string) => {
    if (showAnswer || isCurrentQuizAnswered) return;
    const correct =
      normalizeAnswer(answer) === normalizeAnswer(currentQuiz?.answer);
    setSelectedAnswer(answer);
    setShowAnswer(true);
    // 답변 상태를 저장
    setAnsweredQuizzes((prev) =>
      new Map(prev).set(currentIdx, { answer, isCorrect: correct })
    );
    
    // 서버에 제출할 때 O/X를 true/false로 변환
    const submitAnswer = normalizeAnswer(answer);
    submit(submitAnswer);
  };

  const handleShortAnswerSubmit = () => {
    handleAnswerSelect(shortAnswer);
  };

  const handleNext = () => {
    if (!showAnswer) return;

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
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  }, [category, mode, difficulty]);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  const handleKeyboard = (e: KeyboardEvent) => {
    if (!currentQuiz) return;

    const target = e.target as HTMLElement | null;
    const isTyping =
      !!target &&
      (target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable);

    // 스페이스/스페이스바로 다음으로 (단, 입력 중이 아닐 때만)
    if (
      (e.code === "Space" || e.key === " " || e.key === "Spacebar") &&
      showAnswer &&
      !isTyping
    ) {
      e.preventDefault(); // 스페이스로 페이지가 스크롤되는 것을 막음
      handleNext();
      return;
    }

    // 이후에는 답안 선택만 막고 싶으면 그대로 막음
    if (isCurrentQuizAnswered) return;

    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      if (["1", "2", "3", "4"].includes(e.key) && currentQuiz.options) {
        handleAnswerSelect(currentQuiz.options[Number(e.key) - 1]);
      }
      // (스페이스는 위에서 처리)
    } else if (currentQuiz.type === "TRUE_FALSE") {
      if (e.key === "o" || e.key === "O" || e.key === "1") {
        handleAnswerSelect("O");
      } else if (e.key === "x" || e.key === "X" || e.key === "2") {
        handleAnswerSelect("X");
      }
    } else if (currentQuiz.type === "SHORT_ANSWER") {
      if (e.key === "Enter" && !e.isComposing) {
        handleShortAnswerSubmit();
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
