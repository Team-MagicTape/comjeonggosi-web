import { Stats } from "../types/states";
import { StatsType } from "../types/statsType";
import { apiClient } from "@/shared/libs/custom-axios";
import { GET_DASHBOARD_STATS } from "@/shared/libs/graphql-queries";

interface StatsResponse {
  data: {
    dashboardStats: Stats;
  };
}

export const fetchStates = async (statsType: StatsType) => {
  try {
    const { data } = await apiClient.post<StatsResponse>("/api/graphql", {
      query: GET_DASHBOARD_STATS,
      variables: { period: statsType.period },
    });
    return data.data.dashboardStats;
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
