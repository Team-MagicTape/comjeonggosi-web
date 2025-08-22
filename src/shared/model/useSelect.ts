import { useState } from "react"

export const useSelect = () => {
  const [viewOption, setViewOption] = useState(false);
  const [closeReq, setCloseReq] = useState(false);

  const toggleViewOption = () => {
    if(!viewOption) {
      setViewOption(true);
    }else{
      setCloseReq(true);
      setTimeout(() => {
        setViewOption(false);
        setCloseReq(false);
      }, 500);
    }
  }

  return {
    viewOption,
    closeReq,
    toggleViewOption
  }
}