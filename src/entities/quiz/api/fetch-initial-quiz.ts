import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_RANDOM_QUIZ } from "@/shared/libs/graphql-queries";
import { ServerQuiz } from "../types/quiz";
import { transformServerQuizToQuiz } from "@/shared/utils/transform-quiz";

interface RandomQuizzesResponse {
  data: {
    randomQuizzes: ServerQuiz[];
  };
}

export const fetchInitialQuiz = async (categoryId?: string) => {
  try {
    const { data } = await customFetch.post<RandomQuizzesResponse>("/graphql", {
      query: GET_RANDOM_QUIZ,
      variables: {
        count: 1,
      },
    });
    
    const serverQuiz = data?.data?.randomQuizzes?.[0];
    if (!serverQuiz) return null;

    // ServerQuiz를 Quiz로 변환 (category 객체 생성)
    const quiz = transformServerQuizToQuiz(serverQuiz, {
      id: categoryId || "unknown",
      name: serverQuiz.category,
      description: serverQuiz.subcategory || "",
      quizCount: 0,
      articleCount: 0,
      createdAt: "",
      updatedAt: "",
    });

    return quiz;
  } catch (e) {
    return null;
  }
};