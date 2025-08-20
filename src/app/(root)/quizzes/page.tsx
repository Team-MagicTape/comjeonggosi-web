import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialQuiz } from "@/entities/quiz/api/fetch-initial-quiz";
import QuizForm from "@/features/solve-quizzes/ui/QuizForm";
import { Suspense } from "react";

const Quizzes = async () => {
  const categories = await fetchCategories();
  const quiz = await fetchInitialQuiz(1);

  return (
    <Suspense>
      <QuizForm categories={categories} initialQuiz={quiz} />
    </Suspense>
  );
};

export default Quizzes;
