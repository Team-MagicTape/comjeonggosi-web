import { useEffect, useState } from "react";
import { registerEditQuizModal } from "../libs/modal-controller";
import { Quiz } from "@/entities/quiz/types/quiz";

export const useEditQuizModal = () => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [value, setValue] = useState<Quiz>();

  useEffect(() => {
    registerEditQuizModal(
      (value: Quiz) => {
        setVisible(true);
        setValue(value);
      },
      () => {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          setVisible(false);
        }, 300);
      }
    );
  }, []);

  return {
    value,
    visible,
    isClosing,
  };
};
