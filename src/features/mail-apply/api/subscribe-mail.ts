import { SubscribeMailRequest, SubscribeMailResponse } from "../types/mail-apply"
import { apiClient } from "@/shared/libs/custom-axios"

export const subscribeMail = async(data : SubscribeMailRequest) : Promise<SubscribeMailResponse> =>{
    const res = await apiClient.post<SubscribeMailResponse>("/questions/subscribe", data)
    return res.data
}