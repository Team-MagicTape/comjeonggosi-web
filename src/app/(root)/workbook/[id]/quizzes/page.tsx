import { fetchWorkbook } from "@/entities/workbook/api/fetch-workbook";
import { fetchWorkbookQuizzes } from "@/entities/workbook/api/fetch-workbook-quizzes";
import WorkbookQuizForm from "@/features/solve-quizzes/ui/WorkbookQuizForm";
import { PathParams } from "@/shared/types/path-params"

const WorkbookQuizzes = async ({ params }: PathParams) => {
  const { id } = await params;
  const workbook = await fetchWorkbook(Number(id));
  const quizzes = await fetchWorkbookQuizzes(workbook?.quizIds || []);

  return (
    <WorkbookQuizForm data={quizzes} />
  )
}

export default WorkbookQuizzes