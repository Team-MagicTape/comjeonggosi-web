import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialQuiz } from "@/entities/quiz/api/fetch-initial-quiz";
import { fetchUser } from "@/entities/user/api/fetch-user";
import QuizModalPage from "./QuizModalPage";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function QuizCategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  
  const [categories, quiz, user] = await Promise.all([
    fetchCategories(),
    fetchInitialQuiz(categoryId),
    fetchUser(),
  ]);

  return (
    <Suspense>
      <QuizModalPage 
        categories={categories} 
        initialQuiz={quiz} 
        user={user} 
        categoryId={categoryId}
      />
    </Suspense>
  );
}
