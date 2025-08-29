import TodayQuestionForm from "@/entities/question/ui/TodayQuestionForm";
import { fetchQuestionById } from "@/entities/question/api/fetch-initial-question";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialMails } from "@/entities/mail/api/fetch-initial-mails";
import TodayQuestionGuide from "@/entities/question/ui/TodayQuestionGuide";

const TodayQuestion = async () => {
  const [questions, categories] = await Promise.all([
    fetchInitialMails(),
    fetchCategories(),
  ]);

  console.log(questions, categories);

  if(questions.length <= 0) {
    return <TodayQuestionGuide />
  }

  const question = await fetchQuestionById(questions[questions.length - 1].id);

  console.log(question);

  if(!question) {
    return <TodayQuestionGuide />
  }
  const category = categories.find((c) => c.id === question.categoryId);

  return <TodayQuestionForm question={question} category={category} />;
};

export default TodayQuestion;
