import { customFetch } from "@/shared/libs/custom-fetch";
import { MySubmission } from "../types/my-submission";

export const fetchInitialSubmissions = async () => {
  try{
    const { data } = await customFetch.get<MySubmission[]>("/quizzes/submissions/my");
    return data;
  }catch{
    return [];
  }
}