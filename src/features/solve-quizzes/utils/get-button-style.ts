export const getButtonStyle = (
  isCurrentQuiz: boolean,
  isSelected: boolean,
  isCorrectAnswer: boolean,
  showAnswer: boolean
) => {
  let buttonStyle =
    "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100";

  if (isCurrentQuiz && showAnswer) {
    if (isCorrectAnswer) {
      buttonStyle = "border-green-500 bg-green-50";
    } else if (isSelected && !isCorrectAnswer) {
      buttonStyle = "border-red-500 bg-red-50";
    } else {
      buttonStyle = "border-gray-200 bg-gray-100";
    }
  } else if (isSelected && isCurrentQuiz) {
    buttonStyle = "border-blue-500 bg-blue-50 shadow-lg";
  }

  return buttonStyle;
};
