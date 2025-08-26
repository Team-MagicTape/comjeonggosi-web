import { ChangeEvent, useState } from "react";
import { subscribeMail } from "../api/subscribe-mail";
import { toast } from "@/shared/providers/ToastProvider";
import { AxiosError } from "axios";
import { EMAIL_REGEX } from "../constants/regex";
import { SubscribeMail } from "../types/get-mail";

export const useMailApplyForm = (initialData: SubscribeMail | null) => {
  const [time, setTime] = useState(
    initialData
      ? `${String(initialData.hour).padStart(2, "0")}`
      : "00"
  );
  const [isSubscribed, setIsSubscribed] = useState(
    !!initialData
  );
  const [email, setEmail] = useState(initialData ? initialData.email : "");

  const initialCategories = initialData ? initialData.categories.map(item => item.id) : [];
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(initialCategories || []);
  const handleCategoryChange = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleTimeUp = () => {
    const [hourStr] = time.split(":");
    const newHour = (Number(hourStr) + 1) % 24;
    setTime(`${newHour.toString().padStart(2, "0")}`);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleTimeDown = () => {
    const [hourStr] = time.split(":");
    const newHour = (Number(hourStr) - 1 + 24) % 24;
    setTime(`${newHour.toString().padStart(2, "0")}`);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      return;
    }
    setTime(value);
  };

  const handleTimeBlur = () => {
    const hour = parseInt(time, 10);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      setTime("00");
    } else {
      setTime(String(hour).padStart(2, "0"));
    }
  };

  const handleClick = async () => {
    if (email.trim().length <= 0) {
      toast.warning("이메일을 입력해 주세요.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      toast.warning("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (!isSubscribed && !time) {
      toast.warning("선호 시간을 선택해주세요.");
      return;
    }
    if (selectedCategoryIds.length === 0) {
      toast.warning("관심 주제를 선택해주세요.");
      return;
    }

    try {
      if (!isSubscribed) {
        const [hourStr, minuteStr] = time.split(":");

        await subscribeMail({
          hour: +hourStr,
          categoryIds: selectedCategoryIds,
          email,
        });
        toast.success("신청 되었습니다");
        setIsSubscribed(true);
      } else {
        const [hourStr, minuteStr] = time.split(":");
        await subscribeMail({
          hour: +hourStr,
          categoryIds: selectedCategoryIds,
          email,
        });
        toast.success("신청이 취소 되었습니다");
        setIsSubscribed(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("구독 실패", err.response?.data || err.message);
    }
  };

  return {
    time,
    isSubscribed,
    handleClick,
    handleCategoryChange,
    selectedCategoryIds,
    handleTimeDown,
    handleTimeUp,
    handleEmail,
    email,
    handleTimeChange,
    handleTimeBlur,
  };
};
