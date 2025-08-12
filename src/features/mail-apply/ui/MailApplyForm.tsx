"use client";

import { useState } from "react";
import { subscribeMail } from "../api/subscribe-mail";
import { unsubscribeMail } from "../api/unsubscribe-mail";
import { toast } from "@/shared/providers/ToastProvider";
import axios, { AxiosError } from "axios";

interface Props {
  initialHour?: number;
  initialMinute?: number;
}
const MailApplyForm = ({initialHour,initialMinute}: Props) => {
  const [time, setTime] = useState(
    initialHour !== undefined && initialMinute !== undefined
      ? `${String(initialHour).padStart(2, "0")}:${String(
          initialMinute
        ).padStart(2, "0")}`
      : ""
  );
  const [isSubscribed, setIsSubscribed] = useState(
    initialHour !== undefined && initialMinute !== undefined
  );

  const handleClick = async () => {
    if (!isSubscribed && !time) {
      toast.warning("선호 시간을 선택해주세요.");
      return;
    }

    try {
      if (isSubscribed) {
        await unsubscribeMail();
        toast.success("신청이 취소되었습니다");
        setIsSubscribed(false);
      } else {
        const [hourStr, minuteStr] = time.split(":");
        await subscribeMail({ hour: +hourStr, minute: +minuteStr });
        setIsSubscribed(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("구독 실패", err.response?.data || err.message);
    }
  };
  const topics = [
    "컴퓨터 구조",
    "데이터베이스",
    "자료구조 & 알고리즘",
    "운영체제",
    "네트워크",
    "프로그래밍 언어",
  ];
  return (
    <div className="flex h-screen">
      <div className="border-gray-300 border-1 w-1/2 h-full flex flex-col gap-9 items-center justify-center pt-6">
        <div className="w-[600px]">
          <span className="text-[30px] font-bold">메일 신청하기</span>
          <div className="flex flex-col text-[15px] font-semibold text-gray-500">
            <span>자신이 원하는 시간, cs퀴즈를 풀어보세요!</span>
            <span>선택한 주제별로 맞춤형 퀴즈를 받아보실 수 있습니다</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <span className="text-[17px] font-bold mb-1">이메일 주소</span>
            <input
              className="w-[600px] h-[40px] border-gray-500 border-1 p-1 rounded-[7px]"
              placeholder="이메일을 입력하세요"
              type="email"
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[17px] font-bold mb-1">이름</span>
            <input
              className="w-[600px] h-[40px] border-gray-500 border-1 p-1 rounded-[7px]"
              placeholder="이름을 입력하세요"
              type="text"
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[17px] font-bold mb-1">선호 시간</span>
            <input
              className="w-[600px] h-[40px] border-gray-500 border-1 p-1 rounded-[7px]"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="w-[600px]">
          <span className="text-[17px] font-bold">
            관심 주제 (복수 선택 가능)
          </span>
          {topics.map((topic) => (
            <label key={topic} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                style={{ accentColor: "#6B5CE7" }}
              />
              {topic}
            </label>
          ))}
        </div>
        <div className="pb-6 w-[600px]">
          <button
            className="w-full h-[50px] bg-[#6B5CE7] text-white rounded-[7px] text-[18px] font-extrabold"
            onClick={handleClick}
          >
            {isSubscribed ? "신청 취소" : "메일 신청"}
          </button>
        </div>
      </div>
      <div className="w-1/2 h-full bg-gray-100 flex items-center justify-center">
        <span className="text-x">핸드폰 프리뷰</span>
      </div>
    </div>
  );
};

export default MailApplyForm;
