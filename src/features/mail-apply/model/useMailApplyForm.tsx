// import { ChangeEvent, useState, useMemo } from "react";
// import { subscribeMail } from "../api/subscribe-mail";
// import { deleteSubscribe } from "../api/delete-subscription";
// import { toast } from "@/shared/providers/ToastProvider";
// import { AxiosError } from "axios";
// import { SubscribeMail } from "../types/get-mail";
// import { User } from "@/entities/user/types/user";
// import { login } from "@/widgets/login-modal/libs/modal-controller";
// import { mailApplySchema } from "../types/validation";

// export const useMailApplyForm = (
//   initialData: SubscribeMail | null,
//   user: User | null
// ) => {
//   const [time, setTime] = useState(
//     initialData ? String(initialData.hour).padStart(2, "0") : "00"
//   );
//   const [isSubscribed, setIsSubscribed] = useState(!!initialData);
//   const [customEmail, setEmail] = useState(initialData?.email || "");
//   const [isLoading, setIsLoading] = useState(false);

//   const initialCategories =
//     initialData?.categories.map((item) => String(item.id)) || [];
//   const [selectedCategoryIds, setSelectedCategoryIds] =
//     useState<string[]>(initialCategories);

//   const handleCategoryChange = (id: string) => {
//     setSelectedCategoryIds((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//   };

//   const handleTimeUp = () => {
//     const hour = Number(time);
//     const newHour = (hour + 1) % 24;
//     setTime(newHour.toString().padStart(2, "0"));
//   };

//   const handleTimeDown = () => {
//     const hour = Number(time);
//     const newHour = (hour - 1 + 24) % 24;
//     setTime(newHour.toString().padStart(2, "0"));
//   };

//   const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value.length > 2) return;
//     setTime(value);
//   };

//   const handleTimeBlur = () => {
//     const hour = parseInt(time, 10);
//     if (isNaN(hour) || hour < 0 || hour > 23) {
//       setTime("00");
//     } else {
//       setTime(hour.toString().padStart(2, "0"));
//     }
//   };

//   // Form validation using Zod schema
//   const isFormValid = useMemo(() => {
//     try {
//       mailApplySchema.parse({
//         email: customEmail.trim(),
//         selectedCategoryIds,
//         time: Number(time),
//       });
//       return true;
//     } catch {
//       return false;
//     }
//   }, [customEmail, selectedCategoryIds, time]);

//   const handleClick = async () => {
//     // 🧪 테스트 모드 설정
//     const TEST_MODE = true; // 테스트 끝나면 false로!
    
//     if (!TEST_MODE && !user) {
//       login.open();
//       return;
//     }
  
//     // ⚠️ 테스트 모드일 때는 validation 스킵
//     if (!TEST_MODE && !isFormValid) {
//       toast.warning("모든 필수 항목을 올바르게 입력해주세요.");
//       return;
//     }
  
//     setIsLoading(true);
    
//     // 🧪 테스트용 더미 데이터
//     if (TEST_MODE) {
//       const dummyData = {
//         hour: 14,
//         categoryIds: ["5a427644-96f3-4c42-8e52-94529e650908"],
//         customEmail: "test@example.com"
//       };
      
//       console.log('🧪 ===== 테스트 모드 시작 =====');
//       console.log('📤 전송할 데이터:', dummyData);
      
//       try {
//         const result = await subscribeMail(dummyData);
//         console.log('🎯 최종 결과:', result);
        
//         if (result) {
//           toast.success("✅ 테스트 성공!");
//         } else {
//           toast.error("❌ 테스트 실패 (result가 null)");
//         }
//       } catch (error) {
//         console.error('💥 에러 발생:', error);
//         toast.error("테스트 중 오류 발생");
//       } finally {
//         setIsLoading(false);
//         console.log('🧪 ===== 테스트 모드 종료 =====');
//       }
//       return;
//     }
    
//     // 기존 실제 로직...
//     try {
//       const hour = Number(time);
  
//       if (!isSubscribed) {
//         const result = await subscribeMail({
//           hour,
//           categoryIds: selectedCategoryIds,
//           customEmail : customEmail.trim() === "" ? null : customEmail,
//         });
  
//         if (result) {
//           toast.success("신청 되었습니다");
//           setIsSubscribed(true);
//         } else {
//           toast.error("신청에 실패했습니다. 다시 시도해주세요.");
//         }
//       } else {
//         const result = await deleteSubscribe();
  
//         if (result) {
//           toast.success("신청이 취소 되었습니다");
//           setIsSubscribed(false);
//         } else {
//           toast.error("취소에 실패했습니다. 다시 시도해주세요.");
//         }
//       }
//     } catch (error) {
//       const err = error as AxiosError;
//       console.error("구독 처리 실패", err.response?.data || err.message);
//       toast.error("오류가 발생했습니다. 다시 시도해주세요.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     time,
//     isSubscribed,
//     isLoading,
//     handleClick,
//     handleCategoryChange,
//     selectedCategoryIds,
//     handleTimeDown,
//     handleTimeUp,
//     handleEmail,
//     customEmail,
//     handleTimeChange,
//     handleTimeBlur,
//     isFormValid,
//   };
// };



import { ChangeEvent, useState, useMemo } from "react";
import { subscribeMail } from "../api/subscribe-mail";
import { deleteSubscribe } from "../api/delete-subscription";
import { toast } from "@/shared/providers/ToastProvider";
import { AxiosError } from "axios";
import { SubscribeMail } from "../types/get-mail";
import { User } from "@/entities/user/types/user";
import { login } from "@/widgets/login-modal/libs/modal-controller";
import { mailApplySchema } from "../types/validation";

export const useMailApplyForm = (
  initialData: SubscribeMail | null,
  user: User | null
) => {
  const [time, setTime] = useState(
    initialData ? String(initialData.hour).padStart(2, "0") : "00"
  );
  const [isSubscribed, setIsSubscribed] = useState(!!initialData);
  const [customEmail, setEmail] = useState(initialData?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const initialCategories =
    initialData?.categories.map((item) => String(item.id)) || [];
  const [selectedCategoryIds, setSelectedCategoryIds] =
    useState<string[]>(initialCategories);

  const handleCategoryChange = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleTimeUp = () => {
    const hour = Number(time);
    const newHour = (hour + 1) % 24;
    setTime(newHour.toString().padStart(2, "0"));
  };

  const handleTimeDown = () => {
    const hour = Number(time);
    const newHour = (hour - 1 + 24) % 24;
    setTime(newHour.toString().padStart(2, "0"));
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) return;
    setTime(value);
  };

  const handleTimeBlur = () => {
    const hour = parseInt(time, 10);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      setTime("00");
    } else {
      setTime(hour.toString().padStart(2, "0"));
    }
  };

  // Form validation using Zod schema
  const isFormValid = useMemo(() => {
    try {
      mailApplySchema.parse({
        email: customEmail.trim(),
        selectedCategoryIds,
        time: Number(time),
      });
      return true;
    } catch {
      return false;
    }
  }, [customEmail, selectedCategoryIds, time]);

  const handleClick = async () => {
    // 🧪 테스트 모드 설정
    const TEST_MODE = true; // 테스트 끝나면 false로!
    
    if (!TEST_MODE && !user) {
      login.open();
      return;
    }
  
    // ⚠️ 테스트 모드일 때는 validation 스킵
    if (!TEST_MODE && !isFormValid) {
      toast.warning("모든 필수 항목을 올바르게 입력해주세요.");
      return;
    }
  
    setIsLoading(true);
    
    // 🧪 테스트용 더미 데이터
    if (TEST_MODE) {
      const dummyData = {
        hour: 14,
        categoryIds: ["5a427644-96f3-4c42-8e52-94529e650908"],
        customEmail: "test@example.com"
      };
      
      console.log('🧪 ===== 테스트 모드 시작 =====');
      console.log('📤 전송할 데이터:', dummyData);
      
      try {
        const result = await subscribeMail(dummyData);
        console.log('🎯 최종 결과:', result);
        
        if (result) {
          toast.success("✅ 테스트 성공!");
        } else {
          toast.error("❌ 테스트 실패 (result가 null)");
        }
      } catch (error) {
        console.error('💥 에러 발생:', error);
        toast.error("테스트 중 오류 발생");
      } finally {
        setIsLoading(false);
        console.log('🧪 ===== 테스트 모드 종료 =====');
      }
      return;
    }
    
    // 기존 실제 로직...
    try {
      const hour = Number(time);
  
      if (!isSubscribed) {
        const result = await subscribeMail({
          hour,
          categoryIds: selectedCategoryIds,
          customEmail: customEmail.trim() === "" ? null : customEmail.trim(),
        });
  
        if (result) {
          toast.success("신청 되었습니다");
          setIsSubscribed(true);
        } else {
          toast.error("신청에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        const result = await deleteSubscribe();
  
        if (result) {
          toast.success("신청이 취소 되었습니다");
          setIsSubscribed(false);
          // 상태 초기화
          setSelectedCategoryIds([]);
          setEmail("");
          setTime("00");
        } else {
          toast.error("취소에 실패했습니다. 다시 시도해주세요.");
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("구독 처리 실패", err.response?.data || err.message);
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    time,
    isSubscribed,
    isLoading,
    handleClick,
    handleCategoryChange,
    selectedCategoryIds,
    handleTimeDown,
    handleTimeUp,
    handleEmail,
    customEmail,
    handleTimeChange,
    handleTimeBlur,
    isFormValid,
  };
};