import { customFetch } from "@/shared/libs/custom-fetch";
import { QuestionType } from "../type/question";

export const fetchQuestionById = async (questionId: number) => {
  try {
    const { data } = await customFetch.get<QuestionType>(
      `/questions/${questionId}`
    );
    return data;
  } catch (error) {
    console.error("오늘의 질문 불러오기 실패", error);
    return null;
  }
};
