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
      <div>
        <HelpText text="TIP1. 1,2,3,4 입력하여 답을 선택할 수 있습니다." />
        <HelpText text="TIP2. 스페이스바 누르면 다음문제로 넘어갑니다." />
      </div>
    </>
  );
};

export default WorkbookQuizzes;
