import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_WORKBOOKS } from "@/shared/libs/graphql-queries";
import { Workbook } from "../types/workbook";

interface WorkbooksResponse {
  data: {
    workbooks: {
      nodes: Workbook[];
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

export const fetchWorkbooks = async () => {
  try {
    const { data } = await customFetch.post<WorkbooksResponse>("/graphql", {
      query: GET_WORKBOOKS,
      variables: {
        page: 1,
        limit: 100,
      },
    });
    console.log(data);
    
    
    return data?.data?.workbooks?.nodes || [];
  } catch (e) {
    return [];
  }
};
