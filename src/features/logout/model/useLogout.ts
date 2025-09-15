import { logout } from "../api/logout";
import { useLoadingStore } from "@/shared/model/useLoadingStore";

export const useLogout = () => {
  const { setIsLoading } = useLoadingStore();

  const submit = async () => {
    const status = await logout();
    if(status === 204) {
      setIsLoading(true);
      window.location.href = "/";
    }
  }

  return submit
}