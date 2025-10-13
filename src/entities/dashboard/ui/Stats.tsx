"use client";

import { useState, useEffect } from "react";
import { fetchStates } from "@/entities/dashboard/api/fetch-states";
import { Stats as StatsType } from "@/entities/dashboard/types/states";
import { User, Users, CircleHelp, Banknote } from "lucide-react";

interface Props {
  initialStats: StatsType;
}

const States = ({ initialStats }: Props) => {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("day");
  const [statsData, setStatsData] = useState(initialStats);
  const [loading, setLoading] = useState(false);

  const periods = [
    { value: "day", label: "일간" },
    { value: "week", label: "주간" },
    { value: "month", label: "월간" },
    { value: "year", label: "연간" },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchStates({ period });
        setStatsData(data);
      } catch (error) {
        console.error("통계 데이터 로드 실패", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [period]);

  const stats = [
    {
      label: "전체 사용자",
      value: statsData.totalUsers,
      icon: User,
    },
    {
      label: "활성 사용자",
      value: statsData.activeUsers,
      icon: Users,
    },
    {
      label: "전체 퀴즈",
      value: statsData.totalQuizzes,
      icon: CircleHelp,
    },
    {
      label: "총 매출",
      value: statsData.totalRevenue,
      icon: Banknote,
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-6">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value as typeof period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === p.value
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">데이터 불러오는 중...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default States;
