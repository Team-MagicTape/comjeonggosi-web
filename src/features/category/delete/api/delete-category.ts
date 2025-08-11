import axios from "axios";

export const deleteCategory = async (categoryId: number) => {
  try {
    const res = await axios.delete(`/admin/categories/${categoryId}`);
    return res;
  } catch (error) {
    console.error("deleteCategory error", error);
    throw error;
  }
};