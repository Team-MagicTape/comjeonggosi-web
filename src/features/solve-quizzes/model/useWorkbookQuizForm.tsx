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

  const [settings, setSettings] = useState<Settings>({
    hideSolved: false,
    autoNext: false,
    noDelay: false,
  });

  const currentQuiz = quizzes[currentIdx];
  const isCorrect = currentQuiz?.answer === selectedAnswer;

  const submit = async (answer: string) => {
    const { isCorrect } = await solveQuizzes(currentQuiz?.id ?? "0", answer);
    return isCorrect as boolean;
  };

  const handleAnswerSelect = async (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    submit(answer).then((isCorrect) => { if(isCorrect) setCorrected(prev => prev+1) });
  };

  const handleShortAnswerSubmit = () => handleAnswerSelect(shortAnswer);

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);

    if(currentIdx >= quizzes.length) return;
    setTimeout(() => setCurrentIdx((prev) => prev + 1), 50);
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeout(() => setCurrentIdx((prev) => prev - 1), 100);
  };

  const handleSettingChange = (setting: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (!currentQuiz) return;
    if (currentQuiz.type === "MULTIPLE_CHOICE") {
      if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
        handleAnswerSelect(currentQuiz.options[Number(e.key) - 1]);
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
      if (e.key === "Enter" && !e.isComposing) {
        handleShortAnswerSubmit().then(() => handleNext());
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

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
    corrected
  };
};
