import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_CATEGORY } from "@/shared/libs/graphql-queries";
import { Category } from "../types/category";

interface CategoryResponse {
  data: {
    category: Category;
  };
}

export const fetchInitialCategoryDetail = async (id: string) => {
  try {
    const { data } = await customFetch.post<CategoryResponse>("/graphql", {
      query: GET_CATEGORY,
      variables: {
        id,
      },
    });
    
    return data?.data?.category || null;
  } catch (error) {
    console.error("fetchInitialCategoryDetail error", error);
    return null;
  }
};