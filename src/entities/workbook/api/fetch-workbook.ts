import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_WORKBOOK } from "@/shared/libs/graphql-queries";
import { Workbook } from "../types/workbook";
import { ServerQuiz } from "@/entities/quiz/types/quiz";
import { transformServerQuizToQuiz } from "@/shared/utils/transform-quiz";
import { User, UserRole } from "@/entities/user/types/user";

interface ServerWorkbook {
  id: string;
  name: string;
  description: string;
  quizCount: number;
  totalSubmissions: number;
  averageAccuracy: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  owner: {
    id: string;
    nickname: string;
    email: string;
    profileImageUrl?: string | null;
    role: string;
    provider: string;
    providerId: string;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
  };
  quizzes: ServerQuiz[];
}

interface WorkbookResponse {
  data: {
    workbook: ServerWorkbook;
  };
}

export const fetchWorkbook = async (id: string): Promise<Workbook | null> => {
  try {
    const { data } = await customFetch.post<WorkbookResponse>("/graphql", {
      query: GET_WORKBOOK,
      variables: {
        id,
      },
    });

    const serverWorkbook = data?.data?.workbook;
    if (!serverWorkbook) return null;

    // ServerQuiz를 Quiz로 변환
    const quizzes = serverWorkbook.quizzes.map((serverQuiz) =>
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

    // User 타입으로 변환
    const owner: User = {
      id: serverWorkbook.owner.id,
      nickname: serverWorkbook.owner.nickname,
      email: serverWorkbook.owner.email,
      profileImageUrl: serverWorkbook.owner.profileImageUrl,
      role: serverWorkbook.owner.role as UserRole,
      provider: serverWorkbook.owner.provider,
      providerId: serverWorkbook.owner.providerId,
      lastLoginAt: serverWorkbook.owner.lastLoginAt,
      createdAt: serverWorkbook.owner.createdAt,
      updatedAt: serverWorkbook.owner.updatedAt,
    };

    // Workbook 타입으로 변환
    const workbook: Workbook = {
      id: serverWorkbook.id,
      name: serverWorkbook.name,
      description: serverWorkbook.description,
      quizCount: serverWorkbook.quizCount,
      totalSubmissions: serverWorkbook.totalSubmissions,
      averageAccuracy: serverWorkbook.averageAccuracy,
      createdAt: serverWorkbook.createdAt,
      updatedAt: serverWorkbook.updatedAt,
      deletedAt: serverWorkbook.deletedAt,
      owner,
      quizzes,
    };

    return workbook;
  } catch (e) {
    console.error("[fetchWorkbook] 조회 실패:", e);
    return null;
  }
};
