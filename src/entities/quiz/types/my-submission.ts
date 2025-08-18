import { Quiz } from "./quiz";

export interface MySubmission {
  isCorrected: boolean;
  userAnswer: string;
  quiz: Quiz;
}