import { customFetch } from "@/shared/libs/custom-fetch";
import { MailDetail } from "../types/mail-detail";

export const fetchInitialMailDetail = async (id: number) => {
  try {
    const { data } = await customFetch.get<MailDetail>(`/questions/${id}`);
    return data;
  } catch {
    return null;
  }
};
