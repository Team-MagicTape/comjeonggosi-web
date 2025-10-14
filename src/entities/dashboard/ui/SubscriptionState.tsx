import { fetchSubState } from "../api/fetch-sub-state";
import { LineChart } from "lucide-react";
import { User, UserCheck, Wallet, TrendingDown } from "lucide-react";

const SubscriptionState = async () => {
  const state = await fetchSubState();
  const plans = [
    {
      label: "전체 구독자",
      value: state.totalSubscribers,
      icon: User,
    },
    {
      label: "현재 구독중인 사용자",
      value: state.activeSubscribers,
      icon: UserCheck,
    },
    {
      label: "월 구독 수익",
      value: state.monthlyRevenue,
      icon: Wallet,
    },
    {
      label: "이탈률",
      value: state.churnRate,
      icon: TrendingDown,
    },
  ];

  return (
    <div>
      <div className="bg-white border border-gray-100 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">구독 통계</h2>
          <LineChart className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.label}
              className="bg-white border border-gray-100 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <plan.icon className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              <h3 className="text-[21px] font-bold text-gray-900 mb-1">
                {plan.value}
              </h3>
              <p className="text-lg text-gray-600">{plan.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionState;
