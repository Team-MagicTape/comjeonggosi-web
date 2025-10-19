import { Stats } from "../types/states";
import { StatsType } from "../types/statsType";
import { apiClient } from "@/shared/libs/custom-axios";

export const fetchStates = async (statsType: StatsType) => {
  try {
    const { data } = await apiClient.get<Stats>(
      `/api/admin/dashboard/stats?period=${statsType.period}`
    );
    return data;
  } catch (error) {
    console.error("데시보드 api", error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalQuizzes: 0,
      totalRevenue: 0,
    };
  }
};
