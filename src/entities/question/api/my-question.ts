import { customFetch } from "@/shared/libs/custom-fetch";
import { Question } from "@/entities/question/types/question";

export const fetchMyQuestions = async () => {
  try {
    const { data } = await customFetch.get<Question[]>("/my/questions");
    return data;
  } catch {
    return null;
  }
};
