import { ServerQuiz, Quiz, QuizChoice } from "@/entities/quiz/types/quiz";
import { QuizDifficulty, QuizType } from "@/entities/quiz/types/quiz-type";
import { Category } from "@/entities/category/types/category";

// Difficulty enum을 number로 변환
export function difficultyToNumber(difficulty: QuizDifficulty): number {
  switch (difficulty) {
    case QuizDifficulty.EASY:
      return 1;
    case QuizDifficulty.MEDIUM:
      return 3;
    case QuizDifficulty.HARD:
      return 5;
    default:
      return 3;
  }
}

// Number를 difficulty enum으로 변환
export function numberToDifficulty(num: number): QuizDifficulty {
  if (num <= 2) return QuizDifficulty.EASY;
  if (num <= 4) return QuizDifficulty.MEDIUM;
  return QuizDifficulty.HARD;
}

// choices를 options 문자열 배열로 변환
export function choicesToOptions(choices?: QuizChoice[]): string[] | undefined {
  if (!choices) return undefined;
  return choices.map(c => c.text);
}

// choices에서 정답 찾기 (MULTIPLE_CHOICE일 때)
export function getCorrectAnswer(type: QuizType, choices?: QuizChoice[], answer?: string): string {
  if (type === QuizType.MULTIPLE_CHOICE && choices) {
    const correctChoice = choices.find(c => c.isCorrect);
    return correctChoice?.text || "";
  }
  return answer || "";
}

// ServerQuiz를 Quiz로 변환
export function transformServerQuizToQuiz(
  serverQuiz: ServerQuiz,
  category: Category
): Quiz {
  return {
    id: serverQuiz.id, // id 필드 사용
    content: serverQuiz.question,
    options: serverQuiz.type === QuizType.MULTIPLE_CHOICE 
      ? choicesToOptions(serverQuiz.choices) 
      : undefined,
    answer: getCorrectAnswer(serverQuiz.type, serverQuiz.choices, serverQuiz.answer),
    category,
    articleId: null,
    type: serverQuiz.type,
    difficulty: difficultyToNumber(serverQuiz.difficulty),
    imageUrl: undefined,
    explanation: serverQuiz.explanation,
  };
}
