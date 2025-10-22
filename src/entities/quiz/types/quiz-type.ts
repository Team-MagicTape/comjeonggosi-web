// Server enum에 맞춤
export enum QuizType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export enum QuizDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

// 편의를 위한 타입 (기존 코드 호환성)
export type QuizTypeValue = 'TRUE_FALSE' | 'SHORT_ANSWER' | 'MULTIPLE_CHOICE';
export type QuizDifficultyValue = 'EASY' | 'MEDIUM' | 'HARD';
