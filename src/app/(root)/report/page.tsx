import React from 'react';
import { Plus } from 'lucide-react';
import { postReport } from '@/entities/report/api/post-report';

const ReportForm = async() => {
//   const report = await postReport();
  
  return (
    <div className="w-full flex gap-6 flex-col py-8 lg:py-10 border border-border bg-white rounded-2xl justify-center items-center">
      {/* 헤더 */}
      <div className='font-bold  lg:text-3xl text-gray-900'>
        주간 학습 리포트
      </div>
      {/* 총 학습 시간 - 메인 */}
      <div className='flex flex-col gap-2 items-center'>
        <div className='flex flex-row gap-2 items-baseline'>
          <div className='font-bold text-5xl lg:text-6xl text-gray-900'>
            23시간
          </div>
          <Plus className="text-orange-500 w-8 h-8" />
        </div>
        <span className='text-lg text-gray-500'>총 학습 시간</span>
      </div>
      <div>
        
      </div>
      {/* 하단 3개 카드 - 가로 배치 */}
      <div className='w-full flex flex-row items-stretch justify-around border-t border-gray-300 pt-8'>
        {/* 완료한 퀴즈 */}
        <div className='flex flex-col  items-center justify-center'>
          <div className='flex flex-row items-center'>
            <div className='font-bold text-5xl text-gray-900'>
              4
            </div>
            <Plus className="text-orange-500 w-6 h-6"/>
          </div>
          <span className='text-base text-gray-500'>완료한 퀴즈</span>
        </div>
        
        {/* 평균 점수 */}
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-row items-center'>
            <div className='font-bold text-5xl text-gray-900'>
              65
            </div>
            <Plus className="text-orange-500 w-6 h-6"/>
          </div>
          <span className='text-base text-gray-500'>평균 점수</span>
        </div>
        
        {/* 지난주 대비 */}
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-row items-center'>
            <div className={`font-bold text-5xl ${5 >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
              {5>= 0 ? '+' : ''}{5}%
            </div>
            <Plus className={`w-6 h-6 ${5 >= 0 ? 'text-orange-500' : 'text-red-500'}`}/>
          </div>
          <span className='text-base text-gray-500'>지난주 대비</span>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
