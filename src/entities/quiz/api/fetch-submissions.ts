import { apiClient } from "@/shared/libs/custom-axios";
import { MySubmission } from "../types/my-submission";

export const fetchSubmissions = async (isCorrected: string) => {
  try{
    const { data } = await apiClient.get<MySubmission[]>(`/quizzes/submissions/my?isCorrected=${isCorrected}`);
    return data;
  }catch{
    return [];
  }
}