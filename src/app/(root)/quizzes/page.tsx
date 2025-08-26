import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialQuiz } from "@/entities/quiz/api/fetch-initial-quiz";
import { fetchUser } from "@/entities/user/api/fetch-user";
import QuizForm from "@/features/solve-quizzes/ui/QuizForm";
import { Suspense } from "react";

const Quizzes = async () => {
  const categories = await fetchCategories();
  const quiz = await fetchInitialQuiz(1);
  const user = await fetchUser();

  return (
    <Suspense>
      <QuizForm categories={categories} initialQuiz={quiz} user={user} />
    </Suspense>
  );
};

export default Quizzes;
