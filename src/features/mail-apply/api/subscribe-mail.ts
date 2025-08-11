import axios from "axios"
import { SubscribeMailRequest, SubscribeMailResponse } from "../types/mail-apply"

export const subscribeMail = async(data : SubscribeMailRequest) : Promise<SubscribeMailResponse> =>{
    const res = await axios.post<SubscribeMailResponse>("/questions/subscribe", data)
    return res.data
}