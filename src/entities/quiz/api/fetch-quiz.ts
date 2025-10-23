import { apiClient } from "@/shared/libs/custom-axios";
import {
  GET_CATEGORY_QUIZZES,
  GET_RANDOM_QUIZ,
} from "@/shared/libs/graphql-queries";
import { ServerQuiz, Quiz } from "../types/quiz";
import { transformServerQuizToQuiz } from "@/shared/utils/transform-quiz";

interface CategoryQuizzesResponse {
  data: {
    categoryQuizzes: {
      nodes: ServerQuiz[];
    };
  };
}

interface RandomQuizzesResponse {
  data: {
    randomQuizzes: ServerQuiz[];
  };
}

// mode: "RANDOM", "SEQUENTIAL"
// difficulty: "1"~"5" (서버는 EASY, MEDIUM, HARD)
export const fetchQuiz = async (
  categoryId: string,
  mode: string,
  difficulty: string,
  hideSolved: boolean
): Promise<Quiz | null> => {
  try {
    const difficultyMap: { [key: string]: string } = {
      "1": "EASY",
      "2": "EASY",
      "3": "MEDIUM",
      "4": "HARD",
      "5": "HARD",
    };

    const mappedDifficulty = difficultyMap[difficulty];

    const { data } = await apiClient.post<CategoryQuizzesResponse>(
      "/api/graphql",
      {
        query: GET_CATEGORY_QUIZZES,
        variables: {
          categoryId,
          page: 1,
          limit: 1,
          difficulty: mappedDifficulty || undefined,
          random: mode === "RANDOM",
        },
      }
    );
    const serverQuiz = data?.data?.categoryQuizzes?.nodes?.[0];

    if (!serverQuiz) return null;

    // ServerQuiz를 Quiz로 변환
    return transformServerQuizToQuiz(serverQuiz, {
      id: categoryId || "unknown",
      name: serverQuiz.category,
      description: serverQuiz.subcategory || "",
      quizCount: 0,
      articleCount: 0,
      createdAt: "",
      updatedAt: "",
    });
  } catch (error) {
    return null;
  }
};
