import { apiClient } from "@/shared/libs/custom-axios";

export const logout = async () => {
  try {
    const { status } = await apiClient.post("/api/auth/logout", {});
    return status;
  } catch {
    return null;
  }
};
