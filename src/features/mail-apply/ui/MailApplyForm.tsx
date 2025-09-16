"use client";

import { useMailApplyForm } from "../model/useMailApplyForm";
import { getCategoryType } from "../types/category";
import { SubscribeMail } from "../types/get-mail";
import { User } from "@/entities/user/types/user";

interface Props {
  initialData: SubscribeMail | null;
  categories: getCategoryType[];
  user: User | null;
}

const MailApplyForm = ({ initialData, categories, user }: Props) => {
  const {
    time,
    handleTimeDown,
    handleTimeUp,
    isSubscribed,
    handleClick,
    handleCategoryChange,
    selectedCategoryIds,
    handleEmail,
    email,
    handleTimeChange,
    handleTimeBlur,
    isFormValid,
  } = useMailApplyForm(initialData, user);

  const calculateHourFromPosition = (clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    const degrees = (angle * 180) / Math.PI + 90;
    const normalizedDegrees = (degrees + 360) % 360;
    
    const hour12 = Math.round(normalizedDegrees / 30) % 12;
    const prevHour = Number(time);
    const prevHour12 = prevHour % 12;
    
    if (prevHour12 === 11 && hour12 === 0) {
      return (prevHour + 1) % 24;
    } else if (prevHour12 === 0 && hour12 === 11) {
      return (prevHour + 23) % 24;
    } else {
      const isPM = prevHour >= 12;
      const newHour = isPM ? (hour12 === 0 ? 12 : hour12 + 12) : hour12;
      return newHour % 24;
    }
  };

  const handleClockMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    const newHour = calculateHourFromPosition(e.clientX, e.clientY, e.currentTarget);
    handleTimeChange({ target: { value: String(newHour) } } as never);
  };

  const handleClockMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const newHour = calculateHourFromPosition(e.clientX, e.clientY, e.currentTarget);
    handleTimeChange({ target: { value: String(newHour) } } as never);
  };

  const handleClockTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const newHour = calculateHourFromPosition(touch.clientX, touch.clientY, e.currentTarget);
      handleTimeChange({ target: { value: String(newHour) } } as never);
    }
  };

  const handleClockTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const newHour = calculateHourFromPosition(touch.clientX, touch.clientY, e.currentTarget);
      handleTimeChange({ target: { value: String(newHour) } } as never);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          메일 신청
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
          매일 원하는 시간에 CS 퀴즈를 받아보세요
        </p>
      </div>
      
      <div className="bg-white border border-gray-100 rounded-lg p-6 lg:p-8 space-y-6">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            메일 받을 시간
          </label>
          <div className="flex flex-col items-center">
            <div 
              className="relative w-60 h-60 sm:w-64 sm:h-64 mb-6 cursor-pointer select-none touch-none"
              onMouseMove={handleClockMouseMove}
              onMouseDown={handleClockMouseDown}
              onTouchMove={handleClockTouchMove}
              onTouchStart={handleClockTouchStart}
            >
              <div className="absolute inset-0 rounded-full bg-gray-50 border border-gray-100"></div>
              
              {[12, 3, 6, 9].map((hour, index) => {
                const angle = (index * 90) - 90;
                const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={hour}
                    className="absolute text-lg font-semibold text-gray-800"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {hour}
                  </div>
                );
              })}
              
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30) - 90;
                const isMainHour = i % 3 === 0;
                if (isMainHour) return null;
                const x = 50 + 44 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 44 * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-300 rounded-full"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                );
              })}
              
              <div
                className="absolute top-1/2 left-1/2 w-1 h-[56px] bg-primary rounded-full origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${(Number(time) % 12) * 30}deg)`
                }}
              />
              
              <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 tabular-nums">
                {Number(time) >= 12 ? '오후' : '오전'} {Number(time) === 0 ? '12' : Number(time) > 12 ? Number(time) - 12 : Number(time)}시
              </div>
              <div className="text-sm text-gray-500 mt-1">매일 이 시간에 발송됩니다</div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이메일 주소
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            onChange={handleEmail}
            value={email}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            받고 싶은 주제를 선택해주세요
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  selectedCategoryIds.includes(cat.id)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            {selectedCategoryIds.length === 0 
              ? "최소 1개 이상 선택해주세요" 
              : `${selectedCategoryIds.length}개 주제 선택됨`}
          </div>
        </div>

        <div className="pt-2">
          <button
            className={`w-full py-3 rounded-lg font-semibold text-base transition-colors ${
              isSubscribed
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                : isFormValid
                ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleClick}
            disabled={!isSubscribed && !isFormValid}>
            {isSubscribed ? "메일 신청 취소하기" : "메일 신청하기"}
          </button>
          {isSubscribed && (
            <p className="text-sm text-gray-500 text-center mt-2">
              현재 매일 {Number(time) >= 12 ? '오후' : '오전'} {Number(time) === 0 ? '12' : Number(time) > 12 ? Number(time) - 12 : Number(time)}시에 메일을 받고 계십니다
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailApplyForm;
