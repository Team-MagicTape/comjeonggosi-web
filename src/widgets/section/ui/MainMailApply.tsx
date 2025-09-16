"use client";
import { useMailApply } from "../model/useMailApply";

const MainMailApply = () => {
  const {goToMail} = useMailApply();
  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-4 lg:p-6">
      <h2 className="text-lg font-semibold mb-2">메일 신청</h2>
      <p className="text-sm text-gray-600 mb-3">
        매일 새로운 CS 퀴즈를 이메일로 받아보세요!
      </p>
      <button 
        className="text-sm font-medium text-primary hover:underline cursor-pointer" 
        onClick={goToMail}
      >
        메일 신청하기 →
      </button>
    </div>
  )
}

export default MainMailApply