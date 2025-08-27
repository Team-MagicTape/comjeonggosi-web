import { useState } from "react";

export const useToggleAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return {
    openIndex,
    handleToggle
  }
};
