import { SubscribeMail } from "../types/mail-apply";
import { customFetch } from "@/shared/libs/custom-fetch";
import { AxiosError } from "axios";

export const getSubscription = async (): Promise<SubscribeMail> => {
  try{
    const { data } = await customFetch.get<SubscribeMail>("/questions/subscription");
    return data;
  }catch(error){
    console.error("구독 정보 가져오기 실패:", error);
    return { hour: 0, categories: [] };
  }
}; 