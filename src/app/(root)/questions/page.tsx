import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialMails } from "@/entities/mail/api/fetch-initial-mails";
import TodayQuestions from "@/entities/question/ui/TodayQuestions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 질문 | 컴정고시",
  description: "CS 공부는 컴정고시!",
  openGraph: {
    title: "컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev/questions",
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
    type: "website"
  }
};

const TodayQuestion = async () => {
  const [categories, questions] = await Promise.all([
    fetchCategories(),
    fetchInitialMails(),
  ]);

  return (
    <TodayQuestions categories={categories} questions={questions} />
  );
};

export default TodayQuestion;
