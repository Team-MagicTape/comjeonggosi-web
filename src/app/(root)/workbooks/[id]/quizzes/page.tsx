import { fetchWorkbook } from "@/entities/workbook/api/fetch-workbook";
import { fetchInitialWorkbookQuizzes } from "@/entities/workbook/api/fetch-initial-workbook-quizzes";
import WorkbookQuizForm from "@/features/solve-quizzes/ui/WorkbookQuizForm";
import { PathParams } from "@/shared/types/path-params";

interface Props extends PathParams {
  params: { id: string };
  searchParams?: {
    section?: string;
  }
}

const WorkbookQuizzes = async ({ params, searchParams }: Props) => {
  const { id } = params;
  const sectionParam = searchParams?.section;
  
  const workbook = await fetchWorkbook(Number(id));
  
  if (!workbook) {
    return <div>문제집을 찾을 수 없습니다.</div>;
  }
  let quizIds = workbook.quizIds;
  if (sectionParam !== undefined) {
    const sectionIndex = parseInt(sectionParam);
    if (!isNaN(sectionIndex)) {
      const startIndex = sectionIndex * 25;
      const endIndex = Math.min((sectionIndex + 1) * 25, workbook.quizIds.length);
      quizIds = workbook.quizIds.slice(startIndex, endIndex);
    }
  }
  const quizzes = await fetchInitialWorkbookQuizzes(quizIds);

  return (
    <>
      <WorkbookQuizForm data={quizzes} />
    </>
  );
};

export default WorkbookQuizzes;