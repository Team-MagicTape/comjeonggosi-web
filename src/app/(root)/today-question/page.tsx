import TodayQuestionForm from "@/entities/question/ui/TodayQuestionForm";
import { fetchQuestionById } from "@/entities/question/api/fetch-initial-question";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialMails } from "@/entities/mail/api/fetch-initial-mails";
import { notFound, redirect } from "next/navigation";

const TodayQuestion = async () => {
  const [questions, categories] = await Promise.all([
    fetchInitialMails(),
    fetchCategories(),
  ]);

  if(questions.length <= 0) {
    redirect("/mail");
  }

  const question = await fetchQuestionById(questions[0].id);

  if(!question) {
    notFound();
  }
  const category = categories.find((c) => c.id === question.categoryId);

  return <TodayQuestionForm question={question} category={category} />;
};

export default TodayQuestion;
