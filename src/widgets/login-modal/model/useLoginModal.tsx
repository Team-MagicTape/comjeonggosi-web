import { useEffect, useState } from "react";
import { registerLoginModal } from "../libs/modal-controller";

export const useLoginModal = () => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    registerLoginModal(
      () => setVisible(true),
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
    visible,
    isClosing,
  };
};
