import { SubscribeMailType } from "../types/mail-apply"
import { apiClient } from "@/shared/libs/custom-axios"

export const subscribeMail = async(data : SubscribeMailType) : Promise<SubscribeMailType> =>{
  const res = await apiClient.post<SubscribeMailType>("/questions/subscribe", data)
  return res.data
}