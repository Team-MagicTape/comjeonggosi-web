import { apiClient } from "@/shared/libs/custom-axios";
import { Mail } from "../types/mail";

export const fetchMails = async (categoryId: string) => {
  try {
    const { data } = await apiClient.get<Mail[]>(`/api/questions?categoryId=${categoryId}`);
    return data;
  } catch {
    return [];
  }
}