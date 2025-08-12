import { CreateCategoryData } from "./create-category-data";
import { apiClient } from "@/shared/libs/custom-axios";

export const createCategory = async (data: CreateCategoryData) => {
  try {
    const res = await apiClient.post("/admin/categories", data);
    return res;
  } catch (error) {
    console.error("createCategory error", error);
    throw error;
  }
};
