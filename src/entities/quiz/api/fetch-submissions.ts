import { apiClient } from "@/shared/libs/custom-axios";
import { MySubmission } from "../types/my-submission";
import { GET_MY_SUBMISSIONS } from "@/shared/libs/graphql-queries";

interface SubmissionsResponse {
  data: {
    mySubmissions: MySubmission[];
  };
}

export const fetchSubmissions = async (isCorrected: string) => {
  try {
    const variables = isCorrected !== "null" ? { isCorrected: isCorrected === "true" } : {};
    
    const { data } = await apiClient.post<SubmissionsResponse>("/api/graphql", {
      query: GET_MY_SUBMISSIONS,
      variables,
    });
    return data.data.mySubmissions;
  } catch {
    return [];
  }
};
