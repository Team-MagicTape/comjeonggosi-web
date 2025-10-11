
import { fetchStreak } from "../api/fetch-streaks"

const StreakForm = async() => {
  const streak = await fetchStreak();
  
  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-all">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-800 text-[15px] font-bold">연속 출석</span>
      </div>
      <span className="text-gray-400 text-xs"></span>
    </div>
  
    <div className="bg-gray-50 rounded-[10px] py-4 px-5 text-center mb-3">
      <span className="text-primary font-extrabold text-[44px] leading-none block mb-1">
        {streak.currentStreak}
      </span>
      <div className="text-gray-500 text-[13px] font-semibold">일 연속</div>
    </div>
  
    <div className="text-gray-600 text-[13px] text-center leading-relaxed">
      {streak.shouldRemind ? "오늘 활동을 시작해보세요!" : "열심히 잘 하고 있어요!"}
    </div>
  </div>
  )
}

export default StreakForm
