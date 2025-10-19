import { apiClient } from "@/shared/libs/custom-axios";
import { subscribeRequest } from "../types/mail-subcribe";
import { MailResponseType } from "../types/mail-res";

export const subscribeMail = async (subscribeRequest : subscribeRequest) => {
  try{
    const { data } = await apiClient.post< MailResponseType>("api/subscriptions", subscribeRequest);
    return data;
  }catch(error){
    return null
  }
};
