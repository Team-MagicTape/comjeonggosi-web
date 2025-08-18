import { fetchCategories } from "@/entities/category/api/fetch-categories";
import QuizForm from "@/features/solve-quizzes/ui/QuizForm";
import { Suspense } from "react";

const Quizzes = async () => {
  const categories = await fetchCategories();

  return (
    <Suspense>
      <QuizForm categories={categories} />
    </Suspense>
  );
};

export default Quizzes;
