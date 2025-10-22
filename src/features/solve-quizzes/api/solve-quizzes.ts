import { apiClient } from "@/shared/libs/custom-axios";

interface SubmitQuizResponse {
  submission: {
    id: string;
    userId: string;
    quizId: string;
    answer: string;
    isCorrected: boolean;
    createdAt: string;
    updatedAt: string;
  };
  isCorrected: boolean;
  correctAnswer: string;
  explanation: string;
}

export const solveQuizzes = async (quizId: string, answer: string) => {
  try {
    const { data } = await apiClient.post<SubmitQuizResponse>(
      `/api/quizzes/${quizId}/submit`,
      { answer } // 서버가 { answer: string } 형식을 기대함
    );
    return data;
  } catch {
    return null;
  }
};
