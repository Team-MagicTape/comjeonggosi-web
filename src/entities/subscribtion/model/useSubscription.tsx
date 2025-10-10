import { useState } from "react";
import { isAxiosError } from "axios";
import { getSubscription } from "@/features/subscription/api/post-sub";
import { updateSubscription } from "@/features/subscription/api/patch-sub";
import { deleteSubscription } from "@/features/subscription/api/delete-sub";
import { PlanType } from "@/features/subscription/types/subscriptions";
import { login } from "@/widgets/login-modal/libs/modal-controller";

export const useSubscription = () => {
  const [currentPlan, setCurrentPlan] = useState<PlanType | null>(null);

  const handleSelectPlan = async (plan: PlanType) => {
    try {
      const data = await getSubscription(plan);
      alert("구독 성공!");
      setCurrentPlan(data.planType);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        
        if (status === 401) {
          login.open();
        } else if (status === 409) {
          alert("이미 구독 중입니다.");
        } else if (status === 400) {
          alert("잘못된 요청입니다.");
        } else {
          alert("구독 중 문제가 발생했습니다.");
        }
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm("정말 구독을 취소하시겠습니까? BASIC 플랜으로 전환됩니다.")) return;
    
    try {
      await deleteSubscription();
      alert("BASIC 플랜으로 전환되었습니다.");
      setCurrentPlan("BASIC");
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        
        if (status === 401) {
          login.open();
        } else if (status === 404) {
          alert("취소할 구독이 없습니다.");
          setCurrentPlan("BASIC");
        } else {
          alert("구독 취소 중 문제가 발생했습니다.");
        }
      }
    }
  };

  const handleChangePlan = async (newPlan: PlanType) => {
    if (!confirm(`플랜을 ${newPlan}(으)로 변경하시겠습니까?`)) return;
    
    try {
      const data = await updateSubscription(newPlan);
      alert("플랜이 변경되었습니다.");
      setCurrentPlan(data.planType);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        
        if (status === 401) {
          login.open();
        } else if (status === 404) {
          alert("변경할 구독이 없습니다.");
          setCurrentPlan("BASIC");
        } else if (status === 409) {
          alert("이미 같은 플랜을 사용 중입니다.");
        } else if (status === 400) {
          alert("잘못된 요청입니다.");
        } else {
          alert("플랜 변경 중 문제가 발생했습니다.");
        }
      }
    }
  };

  const getButtonConfig = (plan: PlanType) => {
    // BASIC 플랜은 취소 불가
    if (currentPlan === plan && plan === "BASIC") {
      return {
        text: "기본 플랜",
        onClick: () => {},
        className: "bg-gray-300 text-gray-600 cursor-not-allowed",
        disabled: true
      };
    }

    if (currentPlan === plan) {
      return {
        text: "구독 취소",
        onClick: handleCancelSubscription,
        className: "bg-gray-400 hover:bg-red-600",
        disabled: false
      };
    }
    
    if (currentPlan) {
      const planOrder = { BASIC: 1, PREMIUM: 2, ENTERPRISE: 3 };
      const isUpgrade = planOrder[plan] > planOrder[currentPlan];
      
      return {
        text: isUpgrade ? "업그레이드" : "변경하기",
        onClick: () => handleChangePlan(plan),
        className: "bg-primary hover:bg-orange-600",
        disabled: false
      };
    }
    
    return {
      text: "선택하기",
      onClick: () => handleSelectPlan(plan),
      className: "bg-primary hover:bg-orange-600",
      disabled: false
    };
  };

  return {
    currentPlan,
    handleSelectPlan,
    handleCancelSubscription,
    handleChangePlan,
    getButtonConfig
  };
};