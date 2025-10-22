import { SubStateType } from "../types/subStateType";
import { customFetch } from "@/shared/libs/custom-fetch";

export const fetchSubState = async () => {
  try {
    const { data } = await customFetch.get<SubStateType>(
      "/api/admin/subscriptions/stats"
    );
    return data;
  } catch (error) {
    return {
      totalSubscribers: 0,
      activeSubscribers: 0,
      monthlyRevenue: 0,
      churnRate: 0,
    };
  }
};
