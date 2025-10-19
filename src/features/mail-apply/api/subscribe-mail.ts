// import { apiClient } from "@/shared/libs/custom-axios";
// import { subscribeRequest } from "../types/mail-subcribe";
// import { MailResponseType } from "../types/mail-res";

// export const subscribeMail = async (subscribeRequest : subscribeRequest) => {
//   try{
//     const { data } = await apiClient.post< MailResponseType>("api/subscriptions", subscribeRequest);
//     return data;
//   }catch(error){
//     return null
//   }
// };
import { apiClient } from "@/shared/libs/custom-axios";
import { subscribeRequest } from "../types/mail-subcribe";
import { MailResponseType } from "../types/mail-res";

export const subscribeMail = async (subscribeRequest : subscribeRequest) => {
  console.log('📤 [subscribeMail] 요청 시작');
  console.log('📦 요청 데이터:', JSON.stringify(subscribeRequest, null, 2));
  
  try{
    const { data } = await apiClient.post<MailResponseType>("api/subscriptions", subscribeRequest);
    console.log('✅ [subscribeMail] 성공');
    console.log('📦 응답 데이터:', JSON.stringify(data, null, 2));
    return data;
  }catch(error){
    console.error('❌ [subscribeMail] 실패:', error);
    return null
  }
};