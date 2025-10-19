// import { SubscribeMail } from "../types/get-mail";
// import { customFetch } from "@/shared/libs/custom-fetch";

// export const getSubscription = async () => {
//   try{
//     const { data } = await customFetch.get<SubscribeMail>("/questions/subscription");
//     return data;
//   }catch(error){
//     console.error("구독 정보 가져오기 실패:", error);
//     return null;
//   }
// }; 
import { SubscribeMail } from "../types/get-mail";
import { customFetch } from "@/shared/libs/custom-fetch";

export const getSubscription = async () => {
  try{
    const { data } = await customFetch.get<SubscribeMail>("/questions/subscription");
    console.log('✅ [getSubscription] 성공:', data);
    return data;
  }catch(error: any){
    // 400 에러 체크 - error.message에 400이 포함되어 있음
    const errorMessage = error?.message || String(error);
    
    if (errorMessage.includes('400')) {
      console.log('ℹ️ [getSubscription] 구독 정보 없음 (400) - 정상');
      return null;
    }
    
    console.error("❌ [getSubscription] 구독 정보 가져오기 실패:", error);
    return null;
  }
};