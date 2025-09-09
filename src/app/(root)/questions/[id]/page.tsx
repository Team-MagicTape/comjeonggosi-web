import TodayQuestionForm from "@/entities/question/ui/TodayQuestionForm";
import { fetchQuestionById } from "@/entities/question/api/fetch-initial-question";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { notFound } from "next/navigation";
import { PathParams } from "@/shared/types/path-params";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PathParams): Promise<Metadata> {
  const { id } = await params;
  const [question, categories] = await Promise.all([
    fetchQuestionById(Number(id)),
    fetchCategories(),
  ]);
  const category = categories.find((c) => c.id === question?.categoryId);

  return {
    title: `${question?.title || ""} | 컴정고시`,
    description: `${category?.name || "자료구조"}도 역시 컴정고시!`,
    openGraph: {
      title: `${question?.title || ""} | 컴정고시`,
      description: `${category?.name || "자료구조"}도 역시 컴정고시!`,
      url: `https://comgo.dev/questions/${id}`,
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
}

const TodayQuestionDetail = async ({ params }: PathParams) => {
  const { id } = await params;

  const [question, categories] = await Promise.all([
    fetchQuestionById(Number(id)),
    fetchCategories(),
  ]);

  if(!question) {
    notFound();
  }
  
  const category = categories.find((c) => c.id === question.categoryId);

  return <TodayQuestionForm question={question} category={category} />;
};

export default TodayQuestionDetail;
