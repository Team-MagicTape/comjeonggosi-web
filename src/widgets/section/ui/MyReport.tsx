import React from 'react';
import { postReport } from '@/entities/report/api/post-report';

const  MyReport = async() => {
  const report = await postReport();
  
  return (
    <div className="w-full flex gap-6 flex-col py-8 lg:py-10 border border-gray-200 bg-white rounded-2xl justify-center items-center">
    {/* Header Banner */}
    <div className="flex bg-primary w-[calc(100%-2rem)] h-40 px-4 rounded-3xl items-center justify-between">
      <div className="flex flex-col pl-4">
        <span className="text-white font-bold text-[23px]">주간 학습 리포트</span>
        <span className="text-white font-semibold">{`${report.period.start} ~ ${report.period.end}`}</span>
      </div>
      <div className="flex flex-col items-end pr-4">
        <span className="text-white font-bold text-6xl">{`${report.studyTime}시간`}</span>
        <span className="text-white font-semibold text-[17px]">총 학습시간</span>
      </div>
    </div>

    {/* Stats Section */}
    <div className="w-[calc(100%-2rem)] grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Card - 2/3 width */}
      <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-8">
        <div className="text-gray-400 text-sm mb-6">학습 활동</div>
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800 mb-3">{report.completedQuizzes}</div>
            <div className="text-gray-600 font-medium">완료한 퀴즈</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800 mb-3">{report.averageScore}</div>
            <div className="text-gray-600 font-medium">평균 점수</div>
          </div>
        </div>
      </div>

      {/* Right Card - 1/3 width */}
      <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-primary mb-3">{`${report.improvement}%`}</div>
        <div className="text-gray-600 font-medium">지난주 대비</div>
      </div>
    </div>
  </div>
  );
};

export default MyReport;
