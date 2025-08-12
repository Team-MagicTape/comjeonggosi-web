import { useState } from "react";
import { subscribeMail } from "../api/subscribe-mail";
import { unsubscribeMail } from "../api/unsubscribe-mail";
import { toast } from "@/shared/providers/ToastProvider";
import { AxiosError } from "axios";

export const useMailApplyForm = (
  initialHour?: number,
  initialMinute?: number
) => {
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

  return {
    time,
    setTime,
    isSubscribed,
    handleClick,
    topics,
  };
};
