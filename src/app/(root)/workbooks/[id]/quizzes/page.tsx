import { fetchWorkbook } from "@/entities/workbook/api/fetch-workbook";
import WorkbookQuizForm from "@/features/solve-quizzes/ui/WorkbookQuizForm";
import { PathParams } from "@/shared/types/path-params";
import { customFetch } from "@/shared/libs/custom-fetch";
import { Quiz } from "@/entities/quiz/types/quiz";

const WorkbookQuizzes = async ({ params }: PathParams) => {
  const { id } = await params;
  const workbook = await fetchWorkbook(String(id));
  
  // Load all quizzes for the workbook
  const totalQuizzes = workbook?._count?.workbookQuizzes || 0;
  let allQuizzes: Quiz[] = [];
  
  if (totalQuizzes > 0) {
    try {
      const { data } = await customFetch.get<{ quizzes: Array<{ quiz: Quiz }> }>(
        `/workbooks/${id}/quizzes?page=1&limit=${totalQuizzes}`
      );
      allQuizzes = data.quizzes.map((wq) => wq.quiz);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    }
  }

  return (
    <>
      <WorkbookQuizForm data={allQuizzes} />
    </>
  );
};

export default WorkbookQuizzes;
