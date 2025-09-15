import { fetchWorkbook } from "@/entities/workbook/api/fetch-workbook";
import { fetchInitialWorkbookQuizzes } from "@/entities/workbook/api/fetch-initial-workbook-quizzes";
import WorkbookQuizForm from "@/features/solve-quizzes/ui/WorkbookQuizForm";
import { PathParams } from "@/shared/types/path-params";
import HelpText from "@/shared/ui/HelpText";

const WorkbookQuizzes = async ({ params }: PathParams) => {
  const { id } = await params;
  const workbook = await fetchWorkbook(Number(id));
  const quizzes = await fetchInitialWorkbookQuizzes(workbook?.quizIds || []);

  return (
    <>
      <WorkbookQuizForm data={quizzes} />
    </>
  );
};

export default WorkbookQuizzes;
