interface Props {
  option: string;
  optionIdx: number;
  isCurrentQuiz: boolean;
  buttonStyle: string;
  circleStyle: string;
  circleContent: string;
  showAnswer: boolean;
  handleAnswerSelect: (option: string) => void;
}

const OptionButton = ({
  option,
  optionIdx,
  isCurrentQuiz,
  buttonStyle,
  circleStyle,
  circleContent,
  showAnswer,
  handleAnswerSelect
}: Props) => {
  return (
    <button
      key={optionIdx}
      onClick={() => isCurrentQuiz && handleAnswerSelect(option)}
      disabled={!isCurrentQuiz || showAnswer}
      className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.01] ${buttonStyle} ${
        !isCurrentQuiz || showAnswer ? "cursor-default" : "cursor-pointer"
      }`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base flex-shrink-0 ${circleStyle}`}>
          {circleContent}
        </div>
        <span className="text-sm sm:text-lg text-gray-800 flex-1">
          {option}
        </span>
      </div>
    </button>
  );
};

export default OptionButton;