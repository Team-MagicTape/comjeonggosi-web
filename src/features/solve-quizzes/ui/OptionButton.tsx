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
        className={`w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${buttonStyle} ${
          !isCurrentQuiz || showAnswer ? "cursor-default" : "cursor-pointer hover:scale-[1.01]"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0 ${circleStyle}`}
          >
            {circleContent}
          </div>
          <span className="text-base sm:text-lg text-gray-800 flex-1 leading-relaxed">
            {option}
          </span>
        </div>
      </button>

      {isIncorrect && (
        <div className="mt-2 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-700 font-semibold">해설</div>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            {explanation || "해설이 제공되지 않았습니다."}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionButton;