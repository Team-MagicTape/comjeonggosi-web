import { apiClient } from "@/shared/libs/custom-axios";
import { subscribeRequest } from "../types/mail-subcribe";

export const subscribeMail = async (subscribeRequest : subscribeRequest): Promise<null> => {
  try{
    const {data} = await apiClient.post("/questions/subscribe", subscribeRequest);
    return data;
  }catch(error){
    console.log("구독 실패", error)
    return null
  }
};
 //메일 구독