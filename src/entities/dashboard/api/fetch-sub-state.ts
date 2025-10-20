import { SubStateType } from "../types/subStateType";
import { customFetch } from "@/shared/libs/custom-fetch";

export const fetchSubState = async () => {
  try {
    const { data } = await customFetch.get<SubStateType>(
      "/api/admin/subscriptions/stats"
    );
    console.log("구독 통계 성공");
    return data;
  } catch (error) {
    console.log("구독 통계 실패");
    return {
      totalSubscribers: 0,
      activeSubscribers: 0,
      monthlyRevenue: 0,
      churnRate: 0,
    };
  }
};
