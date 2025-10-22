export const getButtonStyle = (
  isCurrentQuiz: boolean,
  isSelected: boolean,
  isCorrectAnswer: boolean,
  showAnswer: boolean
) => {
  let buttonStyle =
    "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50";

  if (isCurrentQuiz && showAnswer) {
    if (isCorrectAnswer) {
      buttonStyle = "border-green-500 bg-green-50 shadow-md";
    } else if (isSelected && !isCorrectAnswer) {
      buttonStyle = "border-red-500 bg-red-50 shadow-md";
    } else {
      buttonStyle = "border-gray-200 bg-gray-50";
    }
  } else if (isSelected && isCurrentQuiz) {
    buttonStyle = "border-[#ff8f63] bg-orange-50 shadow-md";
  }

  return buttonStyle;
};
