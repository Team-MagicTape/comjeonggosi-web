import { useCustomRouter } from "@/shared/model/useCustomRouter";
import { useEffect } from "react";

export const useSuccess = () => {
  const router = useCustomRouter();

  useEffect(() => {
    const redirectPath = localStorage.getItem("redirect");
    if (redirectPath) {
      router.replace(redirectPath);
      localStorage.removeItem("redirect");
    } else {
      router.replace("/");
    }
  }, []);
};
