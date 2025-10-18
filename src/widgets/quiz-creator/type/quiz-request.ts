export interface ChoiceRequestType {
    text: string;
    isCorrect: boolean;
  }
  
  export interface QuizRequestType {
    type: "MULTIPLE_CHOICE" | "SHORT_ANSWER" | "TRUE_FALSE" | string;
    category: string;
    subcategory: string;
    difficulty: "EASY" | "MEDIUM" | "HARD" | string;
    question: string;
    choices: ChoiceRequestType[];
    answer: string;
    explanation: string;
    tags: string[];
    source: string;
    yearAppeared: number;
  }
  