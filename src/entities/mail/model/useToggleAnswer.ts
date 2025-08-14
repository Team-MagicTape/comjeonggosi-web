import { useState } from "react"

export const useToggleAnswer = () => {
  const [open, setOpen] = useState(false);

  const openAnswer = () => {
    setOpen(true);
  }

  return {
    open,
    openAnswer
  }
}