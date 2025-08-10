import { fetchCategories } from "@/entities/category/api/fetch-categories"
import QuizForm from "@/features/solve-quizzes/ui/QuizForm"

const Quizzes = async () => {
  const categories = await fetchCategories();

  return (
    <QuizForm categories={categories} />
  )
}

export default Quizzes