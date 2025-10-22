import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_WORKBOOK } from "@/shared/libs/graphql-queries";
import { Workbook } from "../types/workbook";

interface WorkbookResponse {
  data: {
    workbook: Workbook;
  };
}

export const fetchWorkbook = async (id: string) => {
  try {
    const { data } = await customFetch.post<WorkbookResponse>("/graphql", {
      query: GET_WORKBOOK,
      variables: {
        id,
      },
    });
    
    return data?.data?.workbook || null;
  } catch (e) {
    return null;
  }
};
