import { SubscribeMail } from "../types/get-mail";
import { customFetch } from "@/shared/libs/custom-fetch";

export const getSubscription = async () => {
  try{
    const { data } = await customFetch.get<SubscribeMail>("/questions/subscription");
    return data;
  }catch(error){
    console.error("구독 정보 가져오기 실패:", error);
    return null;
  }
}; 
