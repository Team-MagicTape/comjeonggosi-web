import { useEffect, useState } from "react";
import { Settings } from "@/features/solve-quizzes/types/settings";
import { Quiz } from "@/entities/quiz/types/quiz";
import { solveQuizzes } from "../api/solve-quizzes";

export const useWorkbookQuizForm = (quizzes: Quiz[]) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shortAnswer, setShortAnswer] = useState("");
  const [corrected, setCorrected] = useState(0);
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
    return isCorrect as boolean;
  };

  const handleAnswerSelect = async (answer: string) => {
    if (showAnswer || isCurrentQuizAnswered) return;
    const correct = currentQuiz?.answer === answer;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    setAnsweredQuizzes((prev) =>
      new Map(prev).set(currentIdx, { answer, isCorrect: correct })
    );
    submit(answer).then((isCorrect) => {
      if (isCorrect) setCorrected((prev) => prev + 1);
    });
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

    setShortAnswer("");

    if (currentIdx >= quizzes.length) return;
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

    setTimeout(() => setCurrentIdx((prev) => prev - 1), 100);
  };

  const handleSettingChange = (setting: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      if ((e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") && (!currentQuiz || isCurrentQuizAnswered)) {
        handleAnswerSelect(currentQuiz.options[Number(e.key) - 1]);
      }
      if (e.key === " " && showAnswer) {
        handleNext();
      }
    } else if (currentQuiz.type === "OX") {
      if ((e.key === "o" || e.key === "O" || e.key === "1") && (!currentQuiz || isCurrentQuizAnswered)) {
        handleAnswerSelect("O");
      } else if ((e.key === "x" || e.key === "X" || e.key === "2") && (!currentQuiz || isCurrentQuizAnswered)) {
        handleAnswerSelect("X");
      }
      if (e.key === " " && showAnswer) {
        handleNext();
      }
    } else if (currentQuiz.type === "SHORT_ANSWER") {
      if ((e.key === "Enter" && !e.isComposing) && (!currentQuiz || isCurrentQuizAnswered)) {
        handleShortAnswerSubmit();
      }
      if (e.key === " " && showAnswer) {
        handleNext();
      }
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setCorrected(0);
    setAnsweredQuizzes(new Map()); // 답변 상태 초기화
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShortAnswer("");
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
    corrected,
    restart,
    isCurrentQuizAnswered,
    answeredQuizzes,
  };
};
