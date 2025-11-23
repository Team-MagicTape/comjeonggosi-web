import { apiClient } from "@/shared/libs/custom-axios";
import { ADD_QUIZ_TO_WORKBOOK } from "@/shared/libs/graphql-queries";

export interface AddQuizToWorkbookInput {
  workbookId: string;
  quizId: string;
}

export interface AddQuizToWorkbookResponse {
  id: string;
  name: string;
  description: string;
  quizCount: number;
  createdAt: string;
  updatedAt: string;
}

export const addQuizToWorkbook = async ({
  workbookId,
  quizId,
}: AddQuizToWorkbookInput): Promise<AddQuizToWorkbookResponse> => {
  const response = await apiClient.post(`/api/graphql`, {
    query: ADD_QUIZ_TO_WORKBOOK,
    variables: { workbookId, quizId },
  });

  if (response.data?.errors) {
    throw new Error(
      response.data.errors[0]?.message || "퀴즈 추가에 실패했습니다."
    );
  }

  return response.data?.data?.addQuizToWorkbook;
};
