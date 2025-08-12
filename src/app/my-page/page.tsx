import UserAvatar from "@/entities/user/ui/UserAvatar";
import { fetchUser } from "@/entities/user/api/user";
import QuestionItem from "@/entities/question/ui/question-item";
import QuizItem from "@/entities/quiz/ui/quiz-item";
import { fetchMyQuizzes } from "@/entities/quiz/api/my-quiz";
import { fetchMyQuestions } from "@/entities/question/api/my-question";

const MyPage = async () => {
  const user = await fetchUser();
  if (!user) {
    return <div>User not found</div>;
  }

  const questions = await fetchMyQuestions();
  const quizzes = await fetchMyQuizzes();

  return (
    <div>
      <h1>My Page</h1>
      <UserAvatar user={user} size={100} />
      <QuestionItem questions={questions || []} />
      <QuizItem quizzes={quizzes || []} />
    </div>
  );
};

export default MyPage;
