interface Props {
  currentIdx: number;
  handlePrev: () => void;
  handleNext: () => void;
  showAnswer: boolean;
  settings: { autoNext: boolean };
}

const QuizNavigation = ({
  currentIdx,
  handlePrev,
  handleNext,
  showAnswer,
  settings
}: Props) => {
  return (
    <div className="flex justify-between items-center px-4 pb-4 sm:px-8 sm:pb-8">
      <button
        onClick={handlePrev}
        disabled={currentIdx === 0}
        className="bg-gray-200 text-gray-600 py-2 sm:py-3 px-4 sm:px-8 rounded-lg sm:rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 disabled:hover:bg-gray-200 text-sm sm:text-base">
        이전
      </button>

      <div className="text-xs sm:text-sm text-gray-500 text-center px-2">
        {!showAnswer
          ? "답변을 선택해주세요"
          : settings.autoNext
          ? "자동으로 넘어가는 중..."
          : "다음 문제로 이동하세요"}
      </div>

      <button
        onClick={handleNext}
        disabled={!showAnswer}
        className="bg-orange-400 text-white py-2 sm:py-3 px-4 sm:px-8 rounded-lg sm:rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary disabled:hover:bg-orange-400 text-sm sm:text-base">
        다음
      </button>
    </div>
  );
};

export default QuizNavigation;