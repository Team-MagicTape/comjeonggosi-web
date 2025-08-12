import { customFetch } from "@/shared/libs/custom-fetch";
import { Category } from "../types/category";

export const fetchCategories = async () => {
  try {
    const { data } = await customFetch.get<Category[]>("/categories");
    console.log(data);
    return data;
  } catch {
    return [];
  }
};
