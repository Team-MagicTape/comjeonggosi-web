"use client";

const MainMailApply = () => {
  return (
    <div className="w-full bg-white border border-border rounded-2xl p-4 xl:p-8 flex flex-col items-start gap-4">
      <h2 className="text-xl xl:text-2xl font-bold">메일 신청하러 가기</h2>
      <p className="text-sm xl:text-base w-full text-center break-keep">매일 새로운 CS 퀴즈를 이메일로 받아보세요!</p>
      <button className="mx-auto bg-primary text-white px-6 py-2 text-lg font-medium rounded-full mt-2 cursor-pointer">
        메일 신청
      </button>
    </div>
  )
}

export default MainMailApply