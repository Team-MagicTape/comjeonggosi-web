"use client";

import { Question } from "@/entities/question/types/question";

interface Props {
  questions: Question[];
}

const QuestionItem = ({ questions }: Props) => {
  return (
    <div>
      <h1>My Questions</h1>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>{question.title}</li>
          ))}
        </ul>
      ) : (
        <p>작성한 질문이 없습니다.</p>
      )}
    </div>
  );
};

export default QuestionItem;
