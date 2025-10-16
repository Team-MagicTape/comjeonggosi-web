import { useEffect, useState, useMemo } from "react";
import { Settings } from "@/features/solve-quizzes/types/settings";
import { Quiz } from "@/entities/quiz/types/quiz";
import { solveQuizzes } from "../api/solve-quizzes";
import { shuffleArray } from "../utils/shuffle-array";

export const useWorkbookQuizForm = (quizzes: Quiz[]) => {
  const shuffledQuizzes = useMemo(() => shuffleArray(quizzes), [quizzes]);
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
  const [wrongOnlyMode, setWrongOnlyMode] = useState(false);
  const [filteredQuizzes, setFilteredQuizzes] =
    useState<Quiz[]>(shuffledQuizzes);
  const currentQuiz = filteredQuizzes[currentIdx];
  const isCorrect = currentQuiz?.answer === selectedAnswer;
  const isCurrentQuizAnswered = answeredQuizzes.has(currentIdx);

  const submit = async (answer: string) => {
    if (!answer) return;
    const { result } = await solveQuizzes(currentQuiz?.id ?? "0", answer);
    if (!result) return;
    return result.isCorrect as boolean;
  };

  const handleAnswerSelect = async (answer: string) => {
    // 이미 답변한 문제인지 확인
    if (answeredQuizzes.has(currentIdx)) return;

    const correct = currentQuiz?.answer === answer;
    setCorrected((prev) => (correct ? prev + 1 : prev));
    setSelectedAnswer(answer);
    setShowAnswer(true);
    setAnsweredQuizzes((prev) =>
      new Map(prev).set(currentIdx, { answer, isCorrect: correct })
    );
    submit(answer);
  };

  const handleShortAnswerSubmit = () => {
    handleAnswerSelect(shortAnswer);
  };

  const handleNext = () => {
    if (!showAnswer) return;
    if (currentIdx >= filteredQuizzes.length) return;

    const nextIdx = currentIdx + 1;
    const nextQuizAnswer = answeredQuizzes.get(nextIdx);

    if (nextQuizAnswer) {
      // 다음 문제가 답변되어 있다면 해당 답변으로 설정
      setSelectedAnswer(nextQuizAnswer.answer);
      setShowAnswer(true);
      setShortAnswer(nextQuizAnswer.answer);
    } else {
      // 답변되지 않은 문제라면 초기화
      setSelectedAnswer(null);
      setShowAnswer(false);
      setShortAnswer("");
    }

    setTimeout(() => setCurrentIdx(nextIdx), 50);
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;

    const prevIdx = currentIdx - 1;
    const prevQuizAnswer = answeredQuizzes.get(prevIdx);

    if (prevQuizAnswer) {
      // 이전 문제가 답변되어 있다면 해당 답변으로 설정
      setSelectedAnswer(prevQuizAnswer.answer);
      setShowAnswer(true);
      setShortAnswer(prevQuizAnswer.answer);
    } else {
      // 답변되지 않은 문제라면 초기화
      setSelectedAnswer(null);
      setShowAnswer(false);
      setShortAnswer("");
    }

    setTimeout(() => setCurrentIdx(prevIdx), 100);
  };

  const handleSettingChange = (setting: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

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

    // 이미 답변한 문제는 다시 선택 못하게
    if (answeredQuizzes.has(currentIdx)) return;

    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      if (["1", "2", "3", "4"].includes(e.key)) {
        handleAnswerSelect(currentQuiz.options[Number(e.key) - 1]);
      }
    } else if (currentQuiz.type === "OX") {
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

  const restart = (wrongOnly = false) => {
    setWrongOnlyMode(wrongOnly);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShortAnswer("");
    setShowAnswer(false);
    if (!wrongOnly) {
      setAnsweredQuizzes(new Map());
      setCorrected(0);
    }
  };

  // 필터링된 퀴즈 목록 업데이트
  useEffect(() => {
    if (wrongOnlyMode) {
      const answeredQuizzesSnapshot = new Map(answeredQuizzes);
      // 틀린 문제만 필터링
      const wrongQuizzes = shuffledQuizzes.filter((_, index) => {
        const answer = answeredQuizzesSnapshot.get(index);
        return answer?.isCorrect === false;
      });
      setFilteredQuizzes(wrongQuizzes);
    } else {
      setFilteredQuizzes(shuffledQuizzes);
    }
  }, [wrongOnlyMode, shuffledQuizzes, answeredQuizzes]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [currentQuiz, showAnswer, shortAnswer, answeredQuizzes]);

  useEffect(() => {
    if (!showAnswer || !settings.autoNext) return;
    const delay = settings.noDelay ? 500 : 3000;
    const timer = setTimeout(handleNext, delay);
    return () => clearTimeout(timer);
  }, [showAnswer, settings.autoNext, settings.noDelay]);

  return {
    currentIdx,
    currentQuiz,
    quizzes: filteredQuizzes,
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
    wrongOnlyMode,
  };
};
