"use client";
import useSubscriptions from "../model/useSubscriptions";

const MainSubscriptions = () => {
    const goToSub = useSubscriptions();
  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-4 lg:p-6">
      <h2 className="text-lg font-semibold mb-2">구독하기</h2>
      <p className="text-sm text-gray-600 mb-3">
      프리미엄 구독으로 CS 퀴즈와 콘텐츠를 무제한 이용하세요!
      </p>
      <button 
        className="text-sm font-medium text-primary hover:underline cursor-pointer" 
        onClick={goToSub}
      >
      구독 하기 →
      </button>
    </div>
  )
}

export default  MainSubscriptions