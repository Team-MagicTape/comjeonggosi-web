import { SubscribeMail } from "../types/mail-apply";
import { customFetch } from "@/shared/libs/custom-fetch";

export const getSubscription = async (): Promise<SubscribeMail> => {
  const res = await customFetch.get<SubscribeMail>("/questions/subscription");
  return res.data
}; 