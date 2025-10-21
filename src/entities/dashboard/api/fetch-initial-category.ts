import { customFetch } from "@/shared/libs/custom-fetch";
import { Category } from "../types/category";

export const fetchInitialCategory = async () => {
  try {
    const { data } = await customFetch.get<Category[]>(
      "/admin/dashboard/category-performance"
    );
    return data;
  } catch (error) {
    return [];
  }
};
