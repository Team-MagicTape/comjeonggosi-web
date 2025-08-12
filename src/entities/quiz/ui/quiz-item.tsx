"use client";

import { Quiz } from "@/entities/quiz/types/quiz";

interface Props {
  quizzes: Quiz[];
}

const QuizItem = ({ quizzes }: Props) => {
  return (
    <div>
      <h1>My Quizzes</h1>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>{quiz.title}</li>
          ))}
        </ul>
      ) : (
        <p>만든 퀴즈가 없습니다.</p>
      )}
    </div>
  );
};

export default QuizItem;
