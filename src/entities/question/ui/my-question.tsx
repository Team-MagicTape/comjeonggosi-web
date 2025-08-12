"use client";

import { useState, useEffect } from "react";
import { fetchMyQuestions } from "@/entities/question/api/my-question";
import { Question } from "@/entities/question/types/question";

const MyQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMyQuestions();
      if (data) {
        setQuestions(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>My Questions</h1>
      <ul>
        {questions.map((question: Question) => (
          <li key={question.id}>{question.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyQuestion;
