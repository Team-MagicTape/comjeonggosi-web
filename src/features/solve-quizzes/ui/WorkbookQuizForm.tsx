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
import { ArrowLeftIcon, CheckCircle2 } from "lucide-react";
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
    corrected,
    restart,
    isCurrentQuizAnswered,
    answeredQuizzes,
  } = useWorkbookQuizForm(data);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col gap-4 justify-center pt-4 overflow-hidden">
      {/* 진행도 표시 막대 */}
      {quizzes.length > 0 && answeredQuizzes.size <= quizzes.length && (
        <div className="w-full space-y-3 xl:px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">진행률</span>
              <span className="text-sm font-semibold text-primary">
                {answeredQuizzes.size} / {quizzes.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${(answeredQuizzes.size / quizzes.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>시작</span>
              <span>
                {Math.round((answeredQuizzes.size / quizzes.length) * 100)}%
                완료
              </span>
              <span>완료</span>
            </div>
          </div>
        </div>
      )}
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
                      className={`mb-2 px-6 py-8 text-white flex gap-3 items-start ${
                        quizIdx === currentIdx && isCurrentQuizAnswered
                          ? "bg-gray-500"
                          : "bg-primary"
                      }`}
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-white">
                          {quizIdx + 1}
                        </span>
                      </div>
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

                    <WorkbookQuizSettings
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />

                    {/* 키보드 단축키 힌트 */}
                    {quizzes.length > 0 &&
                      currentIdx < quizzes.length &&
                      !selectedAnswer && (
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

            <div className="w-full flex-shrink-0 pb-8 xl:px-4" key={10000}>
              <div className="w-full h-146 mx-auto bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl flex flex-col items-center justify-center sm:rounded-3xl overflow-hidden shadow-xl border border-emerald-100">
                <div className="flex flex-col items-center px-8 py-12">
                  {/* 축하 아이콘 */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-emerald-200 rounded-full opacity-25 animate-ping"></div>
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      수고하셨습니다!
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      문제집의 모든 문제를 완료했습니다
                    </p>

                    {/* 점수 표시 */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                      <div className="text-sm text-gray-500 mb-2">
                        최종 점수
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-bold text-emerald-500">
                          {corrected}
                        </span>
                        <span className="text-2xl text-gray-400">/</span>
                        <span className="text-4xl font-bold text-gray-700">
                          {quizzes.length}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${(corrected / quizzes.length) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          정답률:{" "}
                          {Math.round((corrected / quizzes.length) * 100)}%
                        </div>
                      </div>
                    </div>

                    {/* 버튼들 */}
                    <div className="space-y-3 w-full max-w-sm">
                      <Button
                        isFullWidth
                        onClick={restart}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <ArrowLeftIcon className="w-4 h-4" />
                        다시 풀기
                      </Button>
                      <CustomLink
                        href="/workbooks"
                        className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                      >
                        <ArrowLeftIcon className="w-4 h-4" />
                        문제집 목록으로
                      </CustomLink>
                    </div>
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
