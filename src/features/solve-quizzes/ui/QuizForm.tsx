"use client";

import { useQuizForm } from "../model/useQuizForm";
import { QUIZ_DATA } from "../constants/dummy";
import QuizHeader from "./QuizHeader";
import OptionButton from "@/entities/quiz/ui/OptionButton";
import AnswerFeedback from "@/entities/quiz/ui/AnswerFeedback";
import QuizNavigation from "@/entities/quiz/ui/QuizNavigation";
import QuizSettings from "./QuizSettings";

const QuizForm = () => {
  const {
    category,
    setCategory,
    currentIdx,
    selectedAnswer,
    currentQuiz,
    getOptionLabel,
    getButtonStyle,
    getOptionCircleStyle,
    getOptionCircleContent,
    showAnswer,
    handleAnswerSelect,
    isCorrect,
    handleNext,
    handlePrev,
    settings,
    handleSettingChange,
  } = useQuizForm();

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-8 py-4 px-2 sm:px-4">
      <QuizHeader category={category} setCategory={setCategory} />

      <div className="flex-1 w-full flex flex-col justify-center overflow-hidden">
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
          {QUIZ_DATA.map((quiz, quizIdx) => (
            <div key={quiz.id} className="w-full flex-shrink-0 px-2">
              <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl h-full overflow-hidden">
                <div className="mb-2 bg-primary p-6 text-white flex flex-col gap-3 items-start">
                  <span className="font-semibold border border-white rounded-full px-4 py-1 bg-[rgba(250,250,250,0.2)]">
                    {quiz.category.name}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-bold flex-1 leading-tight">
                    {quiz.content}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 pt-4 sm:px-8 sm:pt-4">
                  {quiz.options.map((option, optionIdx) => (
                    <OptionButton
                      key={optionIdx}
                      option={option}
                      optionIdx={optionIdx}
                      isCurrentQuiz={quizIdx === currentIdx}
                      buttonStyle={getButtonStyle(
                        quizIdx === currentIdx,
                        selectedAnswer === optionIdx,
                        currentQuiz.options[optionIdx] === quiz.answer,
                        showAnswer
                      )}
                      circleStyle={getOptionCircleStyle(
                        quizIdx === currentIdx,
                        selectedAnswer === optionIdx,
                        currentQuiz.options[optionIdx] === quiz.answer,
                        showAnswer
                      )}
                      circleContent={getOptionCircleContent(
                        quizIdx === currentIdx,
                        selectedAnswer === optionIdx,
                        currentQuiz.options[optionIdx] === quiz.answer,
                        showAnswer,
                        getOptionLabel(optionIdx)
                      )}
                      showAnswer={showAnswer}
                      handleAnswerSelect={handleAnswerSelect}
                    />
                  ))}
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
              </div>
            </div>
          ))}
        </div>

        {/* 설정 */}
        <QuizSettings
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      </div>
    </div>
  );
};

export default QuizForm;
