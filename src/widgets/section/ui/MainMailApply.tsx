"use client";
import { useMailApply } from "../model/useMailApply";

const MainMailApply = () => {
  const {goToMail} = useMailApply();
  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-4 lg:p-6 flex flex-col gap-3">
      <h2 className="text-lg lg:text-xl font-semibold">메일 신청하러 가기</h2>
      <p className="text-sm text-gray-600 text-center break-keep">매일 새로운 CS 퀴즈를 이메일로 받아보세요!</p>
      <button className="mx-auto bg-primary text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors" onClick={goToMail}>
        메일 신청
      </button>
    </div>
  )
}

export default MainMailApply