import { apiClient } from "@/shared/libs/custom-axios";
import { SubType } from "../types/subscriptions";
export const updateSubscription = async (planType:string) => {
  try{
    const { data } = await apiClient.patch<SubType>("api/subscriptions", {planType});
    console.error("구독 수정 성공");
    return data;
  }catch(error){
    console.error("구독 수정 실패:", error);
    throw error;
  }
}; 