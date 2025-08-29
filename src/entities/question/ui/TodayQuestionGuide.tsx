const TodayQuestionGuide = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 left-0">
        <div className="font-extrabold text-4xl">오늘의 질문</div>
        <div className="text-[16px] font-bold mb-[40px] text-[#b7b7b7]">
          매일 새로운 질문으로 생각의 깊이를 더해보세요
        </div>
      </div>
      <div className="gap-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="w-full h-full bg-white rounded-[16px] p-7">
          <div className="flex justify-between mb-4">
            <div className="h-8 bg-[#ff723a] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[white] font-semibold">Day 3</span>
            </div>
            <div className="h-8 bg-[#f1f3f4] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[#858586] font-semibold">네트워크</span>
            </div>
          </div>
          <div className="font-bold text-[18px] text-[#333] mb-[13px]">IP Address &apos;127.0.0.1&apos;이 의미하는 것은?</div>
          <div className="text-[#666] text-[14px] line-clamp-2 overflow-hidden mb-[13px]">127.0.0.1은 루프백(Loopback) 주소라고 불려요. 자기 자신을 가리키는 IP 주소예요. 즉, 네트워크를 타지 않고 자기 컴퓨터 내부에서만 통신할 때 사용해요.</div>
          <div className="w-full h-[1px] bg-[#f1f3f4] mb-[13px]"></div>
          <div className="text-[#ff723a] font-bold text-[15px] mb-[13px]">오늘의 답변</div>
          <div className="line-clamp-2 text-[#333]">127.0.0.1은 루프백(Loopback) 주소로, 자신의 컴퓨터를 의미한다. 보통 localhost와 동일하게 쓰이며, 외부 네트워크와 통신하지 않고 자기 자신과의 통신을 위해 사용된다</div>
        </div>
        <div className="w-full h-full bg-white rounded-[16px] p-7">
          <div className="flex justify-between mb-4">
            <div className="h-8 bg-[#ff723a] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[white] font-semibold">Day 2</span>
            </div>
            <div className="h-8 bg-[#f1f3f4] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[#858586] font-semibold">네트워크</span>
            </div>
          </div>
          <div className="font-bold text-[18px] text-[#333] mb-[13px]">IP Address &apos;127.0.0.1&apos;이 의미하는 것은?</div>
          <div className="text-[#666] text-[14px] line-clamp-2 overflow-hidden mb-[13px]">127.0.0.1은 루프백(Loopback) 주소라고 불려요. 자기 자신을 가리키는 IP 주소예요. 즉, 네트워크를 타지 않고 자기 컴퓨터 내부에서만 통신할 때 사용해요.</div>
          <div className="w-full h-[1px] bg-[#f1f3f4] mb-[13px]"></div>
          <div className="text-[#ff723a] font-bold text-[15px] mb-[13px]">오늘의 답변</div>
          <div className="line-clamp-2 text-[#333]">127.0.0.1은 루프백(Loopback) 주소로, 자신의 컴퓨터를 의미한다. 보통 localhost와 동일하게 쓰이며, 외부 네트워크와 통신하지 않고 자기 자신과의 통신을 위해 사용된다</div>
        </div>
        <div className="w-full h-full bg-white rounded-[16px] p-7">
          <div className="flex justify-between mb-4">
            <div className="h-8 bg-[#ff723a] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[white] font-semibold">Day 1</span>
            </div>
            <div className="h-8 bg-[#f1f3f4] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[#858586] font-semibold">네트워크</span>
            </div>
          </div>
          <div className="font-bold text-[18px] text-[#333] mb-[13px]">IP Address &apos;127.0.0.1&apos;이 의미하는 것은?</div>
          <div className="text-[#666] text-[14px] line-clamp-2 overflow-hidden mb-[13px]">127.0.0.1은 루프백(Loopback) 주소라고 불려요. 자기 자신을 가리키는 IP 주소예요. 즉, 네트워크를 타지 않고 자기 컴퓨터 내부에서만 통신할 때 사용해요.</div>
          <div className="w-full h-[1px] bg-[#f1f3f4] mb-[13px]"></div>
          <div className="text-[#ff723a] font-bold text-[15px] mb-[13px]">오늘의 답변</div>
          <div className="line-clamp-2 text-[#333]">127.0.0.1은 루프백(Loopback) 주소로, 자신의 컴퓨터를 의미한다. 보통 localhost와 동일하게 쓰이며, 외부 네트워크와 통신하지 않고 자기 자신과의 통신을 위해 사용된다</div>
        </div>
        <div className="w-full h-full bg-white rounded-[16px] p-7">
          <div className="flex justify-between mb-4">
            <div className="h-8 bg-[#ff723a] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[white] font-semibold">Day 1</span>
            </div>
            <div className="h-8 bg-[#f1f3f4] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
              <span className="text-[#858586] font-semibold">네트워크</span>
            </div>
          </div>
          <div className="font-bold text-[18px] text-[#333] mb-[13px]">IP Address &apos;127.0.0.1&apos;이 의미하는 것은?</div>
          <div className="text-[#666] text-[14px] line-clamp-2 overflow-hidden mb-[13px]">127.0.0.1은 루프백(Loopback) 주소라고 불려요. 자기 자신을 가리키는 IP 주소예요. 즉, 네트워크를 타지 않고 자기 컴퓨터 내부에서만 통신할 때 사용해요.</div>
          <div className="w-full h-[1px] bg-[#f1f3f4] mb-[13px]"></div>
          <div className="text-[#ff723a] font-bold text-[15px] mb-[13px]">오늘의 답변</div>
          <div className="line-clamp-2 text-[#333]">127.0.0.1은 루프백(Loopback) 주소로, 자신의 컴퓨터를 의미한다. 보통 localhost와 동일하게 쓰이며, 외부 네트워크와 통신하지 않고 자기 자신과의 통신을 위해 사용된다</div>
        </div>
      </div>
    </div>
  );
};

export default TodayQuestionGuide;
