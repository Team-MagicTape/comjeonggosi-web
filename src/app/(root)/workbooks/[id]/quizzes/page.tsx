import { fetchWorkbook } from "@/entities/workbook/api/fetch-workbook";
import WorkbookQuizForm from "@/features/solve-quizzes/ui/WorkbookQuizForm";
import { PathParams } from "@/shared/types/path-params";

const WorkbookQuizzes = async ({ params }: PathParams) => {
  const { id } = await params;
  const workbookId = String(id);

  // GraphQL로 워크북 정보와 퀴즈를 한 번에 조회
  const workbook = await fetchWorkbook(workbookId);

  console.log("[WorkbookQuizzes] 로드 완료:", {
    workbookId,
    workbookName: workbook?.name,
    quizCount: workbook?.quizzes?.length || 0,
  });

  return (
    <>
      <WorkbookQuizForm data={workbook?.quizzes || []} />
    </>
  );
};

export default WorkbookQuizzes;
