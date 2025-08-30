import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchInitialMails } from "@/entities/mail/api/fetch-initial-mails";
import TodayQuestions from "@/entities/question/ui/TodayQuestions";

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
