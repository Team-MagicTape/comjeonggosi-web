import { ChoiceType } from "./choice";
  export interface QuizBulkResponseType {
    _id: string;
    type: "MULTIPLE_CHOICE" | "SHORT_ANSWER" | "TRUE_FALSE" | string;
    category: string;
    subcategory: string;
    difficulty: "EASY" | "MEDIUM" | "HARD" | string;
    question: string;
    choices: ChoiceType[];
    answer: string;
    explanation: string;
    tags: string[];
    source: string;
    yearAppeared: number;
    createdAt: string; 
    updatedAt: string; 
  }
  
  export type QuizList = QuizBulkResponseType[];
  