import { fetchCategories } from "@/entities/category/api/fetch-categories";
import AdminPageHeader from "@/widgets/admin/ui/AdminPageHeader";
import QuizCreator from "@/features/quiz-creator/ui/QuizCreator";

const QuizzesAdminPage = async () => {
  const categories = await fetchCategories();

  return (
        <div>
      <AdminPageHeader
        title="퀴즈 생성"
        description="새로운 퀴즈를 만들어 문제 은행을 확장하세요"
      />

      <QuizCreator categories={categories} />
    </div>
  );
};

export default QuizzesAdminPage;