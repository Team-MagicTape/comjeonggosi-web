export interface QuizType {
    type: "MULTIPLE_CHOICE" | "SHORT_ANSWER" | "TRUE_FALSE" | string;
    category: string;
    subcategory: string;
    difficulty: "EASY" | "MEDIUM" | "HARD" | string;
    question: string;
    choices: {
      text: string;
      isCorrect: boolean;
    }[];
    answer: string;
    explanation: string;
    tags: string[];
    source: string;
    yearAppeared: number;
  }
  