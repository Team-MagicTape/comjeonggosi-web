import TodayQuestionForm from "@/entities/question/ui/TodayQuestionForm";
import { fetchQuestionById } from "@/entities/question/api/fetch-initial-question";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { notFound } from "next/navigation";
import { PathParams } from "@/shared/types/path-params";

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
