import { TrendingUp } from "lucide-react";
import { fetchUser } from "../api/fetch-user";

const UserGrowth = async () => {
  const userGrowth = await fetchUser();

  const maxNewUsers = Math.max(...userGrowth.map((data) => data.newUsers), 0);

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          사용자 증가 추이
        </h2>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-end justify-between gap-2 h-64 min-w-max px-2">
          {userGrowth.map((data) => (
            <div
              key={data.totalUsers}
              className="flex flex-col items-center gap-2 group"
              style={{ width: "32px" }}
            >
              <div className="relative w-full flex flex-col items-center justify-end h-48">
                <div
                  className="bg-orange-500 rounded-t transition-all duration-300 hover:bg-orange-600 cursor-pointer relative"
                  style={{
                    height:
                      maxNewUsers === 0
                        ? "8px"
                        : `${(data.newUsers / maxNewUsers) * 100}%`,
                    minHeight: "8px",
                    width: "25px",
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    +{data.newUsers}명
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 font-medium whitespace-nowrap">
                  {new Date(data.date).toLocaleDateString("ko-KR", {
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;
