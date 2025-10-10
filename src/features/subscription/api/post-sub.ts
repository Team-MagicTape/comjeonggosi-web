import { apiClient } from "@/shared/libs/custom-axios";
import { SubType } from "../types/subscriptions";
export const getSubscription = async (planType:string) => {
  try{
    const { data } = await apiClient.post<SubType>("api/subscriptions", {planType});
    console.error("구독 하기 성공");
    return data;
  }catch(error){
    console.error("구독 하기 실패:", error);
    throw error;
  }
}; 