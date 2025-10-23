import { Quiz, ServerQuiz } from "@/entities/quiz/types/quiz";
import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_WORKBOOK_QUIZZES } from "@/shared/libs/graphql-queries";
import { transformServerQuizToQuiz } from "@/shared/utils/transform-quiz";

interface WorkbookQuizzesResponse {
  data: {
    workbookQuizzes: {
      nodes: ServerQuiz[];
      pageInfo: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    };
  };
}

/**
 * 워크북의 퀴즈들만 GraphQL로 조회 (페이지네이션 지원)
 *
 * ⚠️ 참고: 일반적으로는 fetchWorkbook()을 사용하여 워크북과 퀴즈를 함께 조회하는 것이 권장됩니다.
 * 이 함수는 특별히 페이지네이션이 필요한 경우에만 사용하세요.
 *
 * @param workbookId - 워크북 ID
 * @param page - 페이지 번호 (기본값: 1)
 * @param limit - 한 번에 가져올 퀴즈 수 (기본값: 20)
 * @returns 변환된 Quiz 배열
 *
 * @example
 * // 워크북의 첫 20개 퀴즈 조회
 * const quizzes = await fetchInitialWorkbookQuizzes('workbook-id');
 *
 * // 페이지네이션과 함께 조회
 * const quizzes = await fetchInitialWorkbookQuizzes('workbook-id', 2, 10);
 */
export const fetchInitialWorkbookQuizzes = async (
  workbookId: string,
  page: number = 1,
  limit: number = 20
): Promise<Quiz[]> => {
  try {
    console.log("[fetchInitialWorkbookQuizzes] 요청 시작:", {
      workbookId,
      page,
      limit,
    });

    const { data } = await customFetch.post<WorkbookQuizzesResponse>(
      "/graphql",
      {
        query: GET_WORKBOOK_QUIZZES,
        variables: {
          workbookId,
          page,
          limit,
        },
      }
    );

    const serverQuizzes = data?.data?.workbookQuizzes?.nodes || [];

    console.log("[fetchInitialWorkbookQuizzes] 조회 완료:", {
      quizCount: serverQuizzes.length,
      currentPage: page,
      totalAvailable: data?.data?.workbookQuizzes?.pageInfo?.total,
      hasNext: data?.data?.workbookQuizzes?.pageInfo?.hasNext,
    });

    // ServerQuiz를 Quiz로 변환
    const quizzes = serverQuizzes.map((serverQuiz) =>
      transformServerQuizToQuiz(serverQuiz, {
        id: serverQuiz.category,
        name: serverQuiz.category,
        description: serverQuiz.subcategory || "",
        quizCount: 0,
        articleCount: 0,
        questionCount: 0,
        createdAt: "",
        updatedAt: "",
      })
    );

    return quizzes;
  } catch (error) {
    console.error("[fetchInitialWorkbookQuizzes] 조회 실패:", error);
    return [];
  }
};
