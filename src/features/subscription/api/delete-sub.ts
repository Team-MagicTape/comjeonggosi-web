import { apiClient } from "@/shared/libs/custom-axios";

export const deleteSubscription = async () => {
  try{
    const { data } = await apiClient.delete("api/subscriptions");
    console.error("구독 취소 성공");
    return data;
  }catch(error){
    console.error("구독 취소 실패:", error);
    throw error;
  }
}; 