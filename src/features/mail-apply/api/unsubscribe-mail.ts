import { apiClient } from "@/shared/libs/custom-axios";

export const unsubscribeMail = async (): Promise<null> => {
  const res = await apiClient.post("/questions/unsubscribe");
  return res.data;
};
