"use client";

import { useRouter } from "next/navigation";
import { QuizModal } from "@/features/solve-quizzes/ui/QuizModal";
import QuizFormClean from "@/features/solve-quizzes/ui/QuizFormClean";
import { Category } from "@/entities/category/types/category";
import { Quiz } from "@/entities/quiz/types/quiz";
import { User } from "@/entities/user/types/user";
import { useEffect, useState } from "react";

interface QuizModalPageProps {
  categories: Category[];
  initialQuiz: Quiz | null;
  user: User | null;
}

export default function QuizModalPage({ categories, initialQuiz, user }: QuizModalPageProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 200);
  };

  return (
    <QuizModal isOpen={isOpen} onClose={handleClose}>
      <QuizFormClean 
        categories={categories} 
        initialQuiz={initialQuiz} 
        user={user}
      />
    </QuizModal>
  );
}
