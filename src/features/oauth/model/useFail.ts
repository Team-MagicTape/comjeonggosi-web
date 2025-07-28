import { useEffect } from "react";

export const useFail = () => {
  const redirectPath = localStorage.getItem("redirect");

  useEffect(() => {
    return () => {
      localStorage.removeItem("redirect");
    };
  }, []);

  return redirectPath;
};
