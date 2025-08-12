"use client";

import { useEffect, useState } from "react";
import { Quiz } from "@/entities/quiz/types/quiz";
import { fetchMyQuizzes } from "@/entities/quiz/api/my-quiz";

const MyQuiz = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMyQuizzes();
      if (data) {
        setQuizzes(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>My Quizzes</h1>
      <ul>
        {quizzes.map((quiz: Quiz) => (
          <li key={quiz.id}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyQuiz;
