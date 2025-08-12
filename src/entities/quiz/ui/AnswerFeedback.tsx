interface Props {
  isCorrect: boolean;
  autoNext: boolean;
}

const AnswerFeedback = ({ isCorrect, autoNext }: Props) => {
  return (
    <div
      className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 animate-fade-in mx-4 sm:mx-8 ${
        isCorrect
          ? "bg-green-50 border-2 border-green-200"
          : "bg-red-50 border-2 border-red-200"
      }`}>
      <div className="flex items-center">
        <h3
          className={`font-bold text-base sm:text-lg ${
            isCorrect ? "text-green-800" : "text-red-800"
          }`}>
          {isCorrect ? "정답입니다!" : "틀렸습니다!"}
        </h3>
      </div>
      {autoNext && (
        <div className="mt-3 text-xs sm:text-sm text-gray-500">
          3초 후 자동으로 다음 문제로 넘어갑니다...
        </div>
      )}
    </div>
  );
};

export default AnswerFeedback;