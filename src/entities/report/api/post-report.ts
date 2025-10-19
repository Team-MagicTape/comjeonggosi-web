import { apiClient } from "@/shared/libs/custom-axios";
import { ReportType } from "../types/report-type";

export const postReport = async () => {
  try {
    const { data } = await apiClient.post<ReportType>("/api/analytics/weekly-report");
    return data;
  } catch (error) {
    console.error("postReport error", error);
    throw error;
  }
};

