export const getOptionCircleContent = (
  isCurrentQuiz: boolean,
  isSelected: boolean,
  isCorrectAnswer: boolean,
  showAnswer: boolean,
  optionLabel: string
) => {
  if (isCurrentQuiz && showAnswer && isCorrectAnswer) return "✓";
  if (isCurrentQuiz && showAnswer && isSelected && !isCorrectAnswer) return "✗";
  return optionLabel;
};
