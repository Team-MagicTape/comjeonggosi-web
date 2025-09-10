"use client";

import { useQuizForm } from "../model/useQuizForm";
import QuizHeader from "./QuizHeader";
import OptionButton from "@/features/solve-quizzes/ui/OptionButton";
import AnswerFeedback from "@/features/solve-quizzes/ui/AnswerFeedback";
import QuizNavigation from "@/features/solve-quizzes/ui/QuizNavigation";
import QuizSettings from "./QuizSettings";
import { getButtonStyle } from "../utils/get-button-style";
import { getOptionCircleStyle } from "../utils/get-option-circle-style";
import { getOptionCircleContent } from "../utils/get-option-circle-content";
import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import CustomLink from "@/shared/ui/CustomLink";
import Button from "@/shared/ui/Button";
import { Loader2 } from "lucide-react";
import OxOption from "./OxOption";
import ShortAnswer from "./ShortAnswer";
import { User } from "@/entities/user/types/user";
import QuizMode from "./QuizMode";
import QuizDifficulty from "./QuizDifficulty";

interface Props {
  categories: Category[];
  initialQuiz: Quiz | null;
  user: User | null;
}

const QuizForm = ({ categories, initialQuiz, user }: Props) => {
  const {
    category,
    setCategory,
    currentIdx,
    selectedAnswer,
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
    handleShortAnswerSubmit,
    shortAnswer,
    setShortAnswer,
    modeList,
    setMode,
    mode,
    difficulty,
    setDifficulty
  } = useQuizForm(categories, initialQuiz, user);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col gap-4 justify-center overflow-hidden">
      <div className="w-full xl:px-4">
        <QuizHeader
          tabs={categoryList}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="w-full flex items-start justify-center relative">
        <div className="flex-1 max-w-4xl overflow-hidden">
          <div
            className="flex-1 h-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
            {quizzes.map((quiz, quizIdx) =>
              quiz ? (
                <div
                  key={quizIdx}
                  className="w-full flex-shrink-0 xl:px-4 pb-8">
                  <div className="w-full mx-auto bg-white rounded-2xl sm:rounded-3xl h-full overflow-hidden shadow-xl">
                    <div className="mb-2 bg-primary px-6 py-8 text-white flex flex-col gap-3 items-start">
                      <h2 className="text-lg sm:text-2xl font-bold flex-1 leading-tight">
                        {quiz?.content}
                      </h2>
                    </div>

                    {quiz.type === "OX" ? (
                      <OxOption
                        currentIdx={currentIdx}
                        handleAnswerSelect={handleAnswerSelect}
                        quiz={quiz}
                        quizIdx={quizIdx}
                        selectedAnswer={selectedAnswer}
                        showAnswer={showAnswer}
                      />
                    ) : quiz.type === "SHORT_ANSWER" ? (
                      <ShortAnswer
                        currentIdx={currentIdx}
                        handleShortAnswerSubmit={handleShortAnswerSubmit}
                        isCorrect={isCorrect}
                        quiz={quiz}
                        quizIdx={quizIdx}
                        selectedAnswer={selectedAnswer}
                        setShortAnswer={setShortAnswer}
                        shortAnswer={shortAnswer}
                        showAnswer={showAnswer}
                      />
                    ) : (
                      <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 pt-4 sm:px-8">
                        {options.map((option, optionIdx) => {
                          const isCorrectAnswer = quiz.answer === option;

                          return (
                            <OptionButton
                              key={optionIdx}
                              option={option}
                              optionIdx={optionIdx}
                              isCurrentQuiz={quizIdx === currentIdx}
                              buttonStyle={getButtonStyle(
                                quizIdx === currentIdx,
                                selectedAnswer === option,
                                isCorrectAnswer,
                                showAnswer
                              )}
                              circleStyle={getOptionCircleStyle(
                                quizIdx === currentIdx,
                                selectedAnswer === option,
                                isCorrectAnswer,
                                showAnswer
                              )}
                              circleContent={getOptionCircleContent(
                                quizIdx === currentIdx,
                                selectedAnswer === option,
                                isCorrectAnswer,
                                showAnswer,
                                `${optionIdx + 1}`
                              )}
                              showAnswer={showAnswer}
                              handleAnswerSelect={handleAnswerSelect}
                            />
                          );
                        })}
                      </div>
                    )}

                    {quizIdx === currentIdx && showAnswer && (
                      <AnswerFeedback
                        isCorrect={isCorrect}
                        autoNext={settings.autoNext}
                      />
                    )}

                    {quizIdx === currentIdx && (
                      <QuizNavigation
                        currentIdx={currentIdx}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        showAnswer={showAnswer}
                        settings={settings}
                      />
                    )}

                    {quiz?.articleId && (
                      <div className="w-full px-4 sm:px-8">
                        <CustomLink
                          className="w-full"
                          href={`/articles/${quiz?.articleId}`}>
                          <Button isFullWidth>관련 아티클 읽으러 가기</Button>
                        </CustomLink>
                      </div>
                    )}

                    <QuizSettings
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="w-full h-154 mx-auto bg-white rounded-2xl flex items-center justify-center sm:rounded-3xl shadow-xl overflow-hidden"
                  key={quizIdx}>
                  <Loader2 className="text-lightgray animate-spin" />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="w-full xl:px-4 space-y-4">
        <QuizMode tabs={modeList} category={mode} setCategory={setMode} />
        <QuizDifficulty difficulty={difficulty} setDifficulty={setDifficulty} />
      </div>
    </div>
  );
};

export default QuizForm;
