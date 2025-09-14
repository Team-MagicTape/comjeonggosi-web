"use client";

import { Quiz } from "@/entities/quiz/types/quiz";
import OxOption from "./OxOption";
import ShortAnswer from "./ShortAnswer";
import OptionButton from "./OptionButton";
import AnswerFeedback from "./AnswerFeedback";
import QuizNavigation from "./QuizNavigation";
import CustomLink from "@/shared/ui/CustomLink";
import Button from "@/shared/ui/Button";
import { useWorkbookQuizForm } from "../model/useWorkbookQuizForm";
import { getButtonStyle } from "../utils/get-button-style";
import { getOptionCircleStyle } from "../utils/get-option-circle-style";
import { getOptionCircleContent } from "../utils/get-option-circle-content";
import { ArrowLeftIcon } from "lucide-react";
import WorkbookQuizSettings from "./WorkbookQuizSettings";

interface Props {
  data: Quiz[];
}

const WorkbookQuizForm = ({ data }: Props) => {
  const {
    currentIdx,
    selectedAnswer,
    showAnswer,
    handleAnswerSelect,
    isCorrect,
    handleNext,
    handlePrev,
    settings,
    handleSettingChange,
    quizzes,
    handleShortAnswerSubmit,
    shortAnswer,
    setShortAnswer,
  } = useWorkbookQuizForm(data);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col gap-4 justify-center overflow-hidden">
      <div className="w-full flex items-start justify-center relative">
        <div className="flex-1 max-w-4xl overflow-hidden">
          <div
            className="flex-1 h-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIdx * 100}%)` }}>
            {quizzes.length > 0 ? (
              quizzes.map((quiz, quizIdx) => (
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
                        {quiz.options.map((option, optionIdx) => {
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

                    <WorkbookQuizSettings
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full xl:px-4">
                <div className="w-full h-154 mx-auto bg-white rounded-2xl flex flex-col items-center justify-center sm:rounded-3xl overflow-hidden">
                  <div className="flex flex-col items-center">
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-semibold text-gray mb-1">
                        퀴즈를 준비중입니다!
                      </h3>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex-shrink-0 xl:px-4" key={10000}>
              <div className="w-full h-154 mx-auto bg-white rounded-2xl flex flex-col items-center justify-center sm:rounded-3xl overflow-hidden">
                <div className="flex flex-col items-center">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-semibold text-gray mb-1">
                      문제집의 모든 문제를 풀었습니다!
                    </h3>
                    <Button isFullWidth>
                      <p>다시풀기</p>
                    </Button>
                    <CustomLink
                      href="/workbook"
                      className="flex items-center text-gray-600 hover:text-primary transition-colors">
                      <ArrowLeftIcon />
                      종료하기
                    </CustomLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkbookQuizForm;
