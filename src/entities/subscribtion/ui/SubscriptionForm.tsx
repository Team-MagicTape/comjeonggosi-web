"use client"

import { PlanType } from "@/features/subscription/types/subscriptions";
import { useSubscription } from "../model/useSubscription";

const SubscriptionForm = () => {
  const { currentPlan, getButtonConfig } = useSubscription();

  const plans = [
    {
      type: "BASIC" as PlanType,
      title: "BASIC",
      description: "기본적인 시험 정보와 필수 콘텐츠를 제공합니다. 처음 시작하시는 분들에게 적합합니다."
    },
    {
      type: "PREMIUM" as PlanType,
      title: "PREMIUM",
      description: "가장 인기있는 플랜! 모든 프리미엄 콘텐츠와 개인 맞춤 학습 경로를 제공합니다."
    },
    {
      type: "ENTERPRISE" as PlanType,
      title: "ENTERPRISE",
      description: "학원, 스터디 그룹을 위한 맞춤형 솔루션. 대량 사용자 관리 및 전담 지원을 제공합니다."
    }
  ];

  return (
    <div className="w-full py-4 lg:py-6 flex flex-col justify-center items-center gap-10">
      <div className="font-bold text-3xl text-center">
        나에게 맞는 플랜을 선택하세요
      </div>
      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-7xl px-4">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.type;
          const buttonConfig = getButtonConfig(plan.type);
          
          return (
            <div
              key={plan.type}
              className={`w-full rounded-lg flex flex-col min-h-[200px] p-5 bg-white transition-all ${
                isCurrentPlan
                  ? "border-2 border-primary"
                  : "border border-gray-300"
              }`}
            >
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-2xl">{plan.title}</span>
                  {isCurrentPlan && (
                    <span className="px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full">
                      현재 플랜
                    </span>
                  )}
                  {plan.type === "BASIC" && (
                    <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full">
                      무료
                    </span>
                  )}
                </div>
                <span className="font-semibold text-[15px] text-gray-500">
                  {plan.description}
                </span>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className={`px-6 py-2 text-white rounded-lg ${buttonConfig.className}`}
                  onClick={buttonConfig.onClick}
                  disabled={buttonConfig.disabled}
                >
                  {buttonConfig.text}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionForm;