"use client";

import { useQuizForm } from "../model/useQuizForm";
import QuizHeader from "./QuizHeader";
import OptionButton from "@/entities/quiz/ui/OptionButton";
import AnswerFeedback from "@/entities/quiz/ui/AnswerFeedback";
import QuizNavigation from "@/entities/quiz/ui/QuizNavigation";
import QuizSettings from "./QuizSettings";
import { getButtonStyle } from "../utils/get-button-style";
import { getOptionCircleStyle } from "../utils/get-option-circle-style";
import { getOptionCircleContent } from "../utils/get-option-circle-content";
import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import CustomLink from "@/shared/ui/CustomLink";
import Button from "@/shared/ui/Button";

interface Props {
  categories: Category[];
  initialQuiz: Quiz | null;
}

const QuizForm = ({ categories, initialQuiz }: Props) => {
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
  } = useQuizForm(categories, initialQuiz);

  return (
    <div className="flex-1 w-full flex flex-col justify-center overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-500 ease-in-out mb-4"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
        {quizzes.map((quiz, quizIdx) => (
          <div key={quizIdx} className="w-full flex-shrink-0 px-2">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl h-full overflow-hidden">
              <div className="mb-2 bg-primary px-6 py-8 text-white flex flex-col gap-3 items-start">
                <h2 className="text-lg sm:text-2xl font-bold flex-1 leading-tight">
                  {quiz.content}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 pt-4 sm:px-8 sm:pt-4">
                {quiz
                  ? options.map((option, optionIdx) => {
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
                    })
                  : null}
              </div>

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

              {quiz.articleId && (
                <CustomLink
                  className="w-full"
                  href={`/articles/${quiz.articleId}`}>
                  <Button>관련 아티클 읽으러 가기</Button>
                </CustomLink>
              )}
            </div>
          </div>
        ))}
      </div>

      <QuizHeader
        tabs={categoryList}
        category={category}
        setCategory={setCategory}
      />

      <QuizSettings
        settings={settings}
        handleSettingChange={handleSettingChange}
      />
    </div>
  );
};

export default QuizForm;
