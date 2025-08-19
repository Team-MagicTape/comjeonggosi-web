import { SubscribeMail } from "../types/mail-apply"
import { apiClient } from "@/shared/libs/custom-axios"

export const subscribeMail = async(data : SubscribeMail) : Promise<SubscribeMail> =>{
  const res = await apiClient.post<SubscribeMail>("/api/questions/subscribe", data)
  return res.data
}