import { fetchCategories } from "@/entities/category/api/fetch-categories";
import AdminHeader from "@/widgets/admin/ui/AdminHeader";
import QuizCreator from "@/widgets/quiz-creator/ui/QuizCreator";

const QuizzesAdmin = async () => {
  const categories = await fetchCategories();

  return (
        <div>
      <AdminHeader
        title="퀴즈 생성"
        description="새로운 퀴즈를 만들어 문제 은행을 확장하세요"
      />

      <QuizCreator categories={categories} />
    </div>
  );
};

export default QuizzesAdmin;