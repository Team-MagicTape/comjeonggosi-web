import { customFetch } from "@/shared/libs/custom-fetch";
import { ReportType } from "../types/report-type";

export const postReport = async (): Promise<ReportType> => {
  const response = await customFetch.post<ReportType>("/analytics/weekly-report", {});
  return response.data;
};

