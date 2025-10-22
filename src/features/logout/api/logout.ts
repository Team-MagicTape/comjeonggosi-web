import { apiClient } from "@/shared/libs/custom-axios";
import { removeStoredUser } from "@/shared/utils/user-storage";

export const logout = async () => {
  try {
    const { status } = await apiClient.post("/api/auth/logout", {});
    
    // localStorage에서 user 제거
    removeStoredUser();
    
    return status;
  } catch {
    return null;
  }
};
