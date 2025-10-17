import { apiClient } from "@/shared/libs/custom-axios";
import { messageType } from "../types/message";

export const deleteSubscribe = async () => {
  try{
    const { data } = await apiClient.delete<messageType>("api/subscriptions");
    return data;
  }catch(error){
    return null
  }
};
