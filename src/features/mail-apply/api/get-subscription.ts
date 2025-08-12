import { SubscribeMailType } from "../types/mail-apply";
import { customFetch } from "@/shared/libs/custom-fetch";

export const getSubscription = async (): Promise<SubscribeMailType> => {
  const res = await customFetch.get<SubscribeMailType>("/questions/subscription");
  return res.data
}; 