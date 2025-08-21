import { useState } from "react";
import { subscribeMail } from "../api/subscribe-mail";
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
    initialHour !== undefined
  );

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const handleCategoryChange = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleClick = async () => {
    if (!isSubscribed && !time) {
      toast.warning("선호 시간을 선택해주세요.");
      return;
    }
    if (selectedCategoryIds.length === 0) {
      toast.warning("관심 주제를 선택해주세요.");
      return;
    }

    try {
      if (isSubscribed) {
        const [hourStr, minuteStr] = time.split(":");
        await subscribeMail({hour : +hourStr, categoryIds : selectedCategoryIds});
        toast.success("신청이 취소되었습니다");
        
        setIsSubscribed(false);
      } else {
        const [hourStr, minuteStr] = time.split(":");
        await subscribeMail({hour : +hourStr, categoryIds : selectedCategoryIds});
        setIsSubscribed(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("구독 실패", err.response?.data || err.message);
    }
  };

  return {
    time,
    setTime,
    isSubscribed,
    handleClick,
    handleCategoryChange,
    selectedCategoryIds
  };
};
