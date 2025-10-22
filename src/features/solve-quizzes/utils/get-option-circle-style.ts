export const getOptionCircleStyle = (
  isCurrentQuiz: boolean,
  isSelected: boolean,
  isCorrectAnswer: boolean,
  showAnswer: boolean
) => {
  if (isCurrentQuiz && showAnswer && isCorrectAnswer) {
    return "bg-green-600 text-white shadow-md";
  }
  if (isCurrentQuiz && showAnswer && isSelected && !isCorrectAnswer) {
    return "bg-red-600 text-white shadow-md";
  }
  if (isSelected && isCurrentQuiz && !showAnswer) {
    return "bg-[#ff8f63] text-white shadow-md";
  }
  return "bg-gray-100 text-gray-500 border border-gray-200";
};


