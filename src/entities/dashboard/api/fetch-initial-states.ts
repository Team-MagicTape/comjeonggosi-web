import { customFetch } from "@/shared/libs/custom-fetch";
import { Stats } from "../types/states";
import { StatsType } from "../types/statsType";

export const fetchInitialStates = async (statsType: StatsType) => {
  try {
    const { data } = await customFetch.get<Stats>(`/admin/dashboard/stats?period=${statsType.period}`);
    return data;
  } catch(error) {  
    return {
      totalUsers: 0,
      activeUsers: 0,
      totalQuizzes: 0,
      totalRevenue: 0,
    };
  }
};
