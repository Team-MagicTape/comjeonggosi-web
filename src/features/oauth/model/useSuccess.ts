import { useCustomRouter } from "@/shared/model/useCustomRouter";
import { useEffect } from "react";

export const useSuccess = () => {
  const redirectPath = localStorage.getItem("redirect");
  const router = useCustomRouter();

  useEffect(() => {
    if(redirectPath) {
      router.replace(redirectPath);
      localStorage.removeItem("redirect");
    }
  }, [redirectPath]);
}