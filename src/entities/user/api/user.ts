import { customFetch } from "@/shared/libs/custom-fetch";
import { User } from "../types/user";

export const fetchUser = async () => {
  try {
    const { data } = await customFetch.get<User>("/auth/me");
    return data;
  } catch {
    return null;
  }
};
