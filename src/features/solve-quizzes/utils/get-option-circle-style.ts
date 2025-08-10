export const getOptionCircleStyle = (
  isCurrentQuiz: boolean,
  isSelected: boolean,
  isCorrectAnswer: boolean,
  showAnswer: boolean
) => {
  if (isCurrentQuiz && showAnswer && isCorrectAnswer) {
    return "bg-green-600 text-white";
  }
  if (isCurrentQuiz && showAnswer && isSelected && !isCorrectAnswer) {
    return "bg-red-600 text-white";
  }
  if (isSelected && isCurrentQuiz && !showAnswer) {
    return "bg-blue-600 text-white";
  }
  return "bg-gray-200 text-gray-600";
};


