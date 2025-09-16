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
    handleShortAnswerSubmit,
    shortAnswer,
    setShortAnswer,
    modeList,
    setMode,
    mode,
    difficulty,
    setDifficulty,
    isCurrentQuizAnswered,
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
            style={{ transform: `translateX(-${currentIdx * 100}%)` }}
          >
            {quizzes.length > 0 ? (
              quizzes.map((quiz, quizIdx) => (
                <div
                  key={quizIdx}
                  className="w-full flex-shrink-0 xl:px-4 pb-8"
                >
                  <div className="w-full mx-auto bg-white rounded-2xl sm:rounded-3xl h-full overflow-hidden shadow-xl">
                    <div
                      className={`mb-2 px-6 py-8 text-white flex flex-col gap-3 items-start ${
                        quizIdx === currentIdx && isCurrentQuizAnswered
                          ? "bg-gray-500"
                          : "bg-primary"
                      }`}
                    >
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
                        isAnswered={
                          quizIdx === currentIdx && isCurrentQuizAnswered
                        }
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
                        isAnswered={
                          quizIdx === currentIdx && isCurrentQuizAnswered
                        }
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
                          href={`/articles/${quiz?.articleId}`}
                        >
                          <Button isFullWidth>관련 아티클 읽으러 가기</Button>
                        </CustomLink>
                      </div>
                    )}

                    <QuizSettings
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />

                    {/* 키보드 단축키 힌트 */}
                    {quizzes.length > 0 && currentIdx < quizzes.length && (
                      <div className="px-4 pb-4 cursor-help">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <div className="text-xs text-yellow-700 font-medium mb-1">
                                  빠른 답변 Tip
                                </div>
                              </div>
                              <div className="text-xs text-yellow-600 space-y-1">
                                {quizzes[currentIdx]?.type === "OX" ? (
                                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                                    <span>
                                      <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                        O
                                      </kbd>{" "}
                                      또는{" "}
                                      <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                        1
                                      </kbd>{" "}
                                      : O 선택
                                    </span>
                                    <span>
                                      <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                        X
                                      </kbd>{" "}
                                      또는{" "}
                                      <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                        2
                                      </kbd>{" "}
                                      : X 선택
                                    </span>
                                    <span>
                                      <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                        Space
                                      </kbd>{" "}
                                      : 답변 후 다음 문제로
                                    </span>
                                  </div>
                                ) : quizzes[currentIdx]?.type !==
                                  "SHORT_ANSWER" ? (
                                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                                    {quizzes[currentIdx]?.options
                                      .slice(0, 4)
                                      .map((_, idx) => (
                                        <span key={idx}>
                                          <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                            {idx + 1}
                                          </kbd>{" "}
                                          : {idx + 1}번 선택
                                        </span>
                                      ))}
                                    <span>
                                      <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                        Space
                                      </kbd>{" "}
                                      : 답변 후 다음 문제로
                                    </span>
                                  </div>
                                ) : (
                                  <span>
                                    답안을 입력하고 엔터를 눌러주세요.{" "}
                                    <kbd className="px-1.5 py-0.5 bg-white border border-yellow-300 rounded text-yellow-700 font-mono">
                                      Space
                                    </kbd>{" "}
                                    : 답변 후 다음 문제로
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
