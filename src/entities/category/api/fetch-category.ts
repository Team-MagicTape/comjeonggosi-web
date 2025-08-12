import { customFetch } from "@/shared/libs/custom-fetch";
import { Category } from "../types/category";

export const fetchCategory = async (): Promise<Category[]> => {
  try {
    const data = await customFetch.get<Category[]>(`/admin/categories`);
    return data;
  } catch (error) {
    console.error("fetchCategory error", error);
    return [];
  }
};
