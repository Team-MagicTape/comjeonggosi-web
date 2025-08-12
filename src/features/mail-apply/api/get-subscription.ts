import { GetSubscriptionResponse } from "../types/mail-apply";
import { customFetch } from "@/shared/libs/custom-fetch";

export const getSubscription = async (): Promise<GetSubscriptionResponse> => {
  const res = await customFetch.get<GetSubscriptionResponse>("/questions/subscription");
  return res.data
}; 