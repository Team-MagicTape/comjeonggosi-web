import { apiClient } from "@/shared/libs/custom-axios";
import { subscribeRequest } from "../types/mail-subcribe";
import { MailResponseType } from "../types/mail-res";

const getAccessToken = () => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(c => c.startsWith('accessToken='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

export const subscribeMail = async (subscribeRequest : subscribeRequest) => {
  // 더미 응답 - 항상 성공
  return {
    id: "dummy-id",
    userId: "dummy-user",
    hour: subscribeRequest.hour,
    customEmail: subscribeRequest.customEmail,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: []
  } as MailResponseType;

  // try{
  //   const token = getAccessToken();
  //   const { data } = await apiClient.post< MailResponseType>(
  //     "/api/subscriptions", 
  //     subscribeRequest,
  //     {
  //       headers: {
  //         ...(token && { Authorization: `Bearer ${token}` })
  //       }
  //     }
  //   );
  //   return data;
  // }catch(error){
  //   return null
  // }
};
