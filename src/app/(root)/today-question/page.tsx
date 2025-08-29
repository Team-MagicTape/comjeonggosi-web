import TodayQuestionForm from "@/entities/question/ui/TodayQuestionForm";
import { fetchQuestionById } from "@/entities/question/api/fetch-initial-question";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialMails } from "@/entities/mail/api/fetch-initial-mails";
import { notFound, redirect } from "next/navigation";
import TodayQuestionGuide from "@/entities/question/ui/TodayQuestionGuide";

const TodayQuestion = async () => {
  const [questions, categories] = await Promise.all([
    fetchInitialMails(),
    fetchCategories(),
  ]);

  if(questions.length <= 0) {
    return <TodayQuestionGuide />
  }

  const question = await fetchQuestionById(questions[0].id);

  if(!question) {
    return <TodayQuestionGuide />
  }
  const category = categories.find((c) => c.id === question.categoryId);

  return <TodayQuestionForm question={question} category={category} />;
};

export default TodayQuestion;
