import { CreateCategoryData } from "../types/create-category-data";
import { apiClient } from "@/shared/libs/custom-axios";

export const createCategory = async (createData: CreateCategoryData) => {
  try {
    const { data } = await apiClient.post("/api/admin/categories", createData);
    return data;
  } catch (error) {
    console.error("createCategory error", error);
    throw error;
  }
};
