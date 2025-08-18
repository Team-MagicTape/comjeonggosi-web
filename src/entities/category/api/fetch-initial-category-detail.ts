import { customFetch } from "@/shared/libs/custom-fetch";
import { Category } from "../types/category";

export const fetchInitialCategoryDetail = async (id: number) => {
  try {
      const { data } = await customFetch.get<Category>(`/categories/${id}`);
      return data;
    } catch {
      return null;
    }
}