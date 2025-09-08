import { customFetch } from "@/shared/libs/custom-fetch";
import { Mail } from "../types/mail";

export const fetchInitialMails = async () => {
  try {
    const { data } = await customFetch.get<Mail[]>("/questions?categoryId=1");
    return data;
  } catch {
    return [];
  }
};
