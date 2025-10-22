import { Quiz } from "@/entities/quiz/types/quiz";
import { customFetch } from "@/shared/libs/custom-fetch";

interface WorkbookQuiz {
  id: string;
  quizId: string;
  createdAt: string;
  quiz: Quiz;
}

interface FetchWorkbookQuizzesResponse {
  quizzes: WorkbookQuiz[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 워크북의 퀴즈들을 페이지네이션으로 조회
export const fetchWorkbookQuizzes = async (
  workbookId: string,
  page: number = 1,
  limit: number = 15
): Promise<FetchWorkbookQuizzesResponse> => {
  try {
    const { data } = await customFetch.get<FetchWorkbookQuizzesResponse>(
      `/workbooks/${workbookId}/quizzes?page=${page}&limit=${limit}`
    );
    return data;
  } catch (e) {
    console.error("Failed to fetch workbook quizzes:", e);
    return {
      quizzes: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
    };
  }
};
