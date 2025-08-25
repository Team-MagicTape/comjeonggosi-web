import { useCustomRouter } from "@/shared/model/useCustomRouter"
import { logout } from "../api/logout";

export const useLogout = () => {
  const router = useCustomRouter();

  const submit = async () => {
    const status = await logout();
    if(status === 204) {
      router.replace("/");
    }
  }

  return submit
}