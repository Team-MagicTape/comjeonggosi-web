import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialQuiz } from "@/entities/quiz/api/fetch-initial-quiz";
import { fetchUser } from "@/entities/user/api/fetch-user";
import QuizForm from "@/features/solve-quizzes/ui/QuizForm";
import { Metadata } from "next";
import { Suspense } from "react";
import HelpText from "@/shared/ui/HelpText";

export const metadata: Metadata = {
  title: "퀴즈 | 컴정고시",
  description: "CS 공부는 컴정고시!",
  openGraph: {
    title: "퀴즈 | 컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev/quizzes",
    siteName: "컴정고시",
    images: [
      {
        url: "https://comgo.dev/assets/og.png",
        width: 1200,
        height: 630,
        alt: "컴정고시",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

const Quizzes = async () => {
  const [categories, quiz, user] = await Promise.all([
    fetchCategories(),
    fetchInitialQuiz(1),
    fetchUser(),
  ]);

  return (
    <Suspense>
      <QuizForm categories={categories} initialQuiz={quiz} user={user} />
      <div>
        <HelpText text="TIP1. 1,2,3,4 입력하여 답을 선택할 수 있습니다." />
        <HelpText text="TIP2. 스페이스바 누르면 다음문제로 넘어갑니다." />
      </div>
    </Suspense>
  );
};

export default Quizzes;
