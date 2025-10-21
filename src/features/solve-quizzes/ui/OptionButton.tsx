interface Props {
  option: string;
  optionIdx: number;
  isCurrentQuiz: boolean;
  buttonStyle: string;
  circleStyle: string;
  circleContent: string;
  showAnswer: boolean;
  handleAnswerSelect: (option: string) => void;
  selectedAnswer?: string | null;
  explanation?: string;
}

const OptionButton = ({
  option,
  optionIdx,
  isCurrentQuiz,
  buttonStyle,
  circleStyle,
  circleContent,
  showAnswer,
  handleAnswerSelect,
  selectedAnswer,
  explanation,
}: Props) => {
  const isIncorrect =
    showAnswer && selectedAnswer && selectedAnswer === option && explanation;

  return (
    <div className="space-y-2">
      <button
        key={optionIdx}
        onClick={() => isCurrentQuiz && handleAnswerSelect(option)}
        disabled={!isCurrentQuiz || showAnswer}
        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 ${buttonStyle} ${
          !isCurrentQuiz || showAnswer ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base flex-shrink-0 ${circleStyle}`}
          >
            {circleContent}
          </div>
          <span className="text-sm sm:text-lg text-gray-800 flex-1">
            {option}
          </span>
        </div>
      </button>

      {isIncorrect && (
        <div className="mt-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
          <div className="text-sm text-blue-600 mb-1 font-medium">해설</div>
          <div className="text-sm text-gray-800">
            {explanation || "해설이 제공되지 않았습니다."}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionButton;