import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_CATEGORIES } from "@/shared/libs/graphql-queries";
import { Category } from "../types/category";

interface CategoriesResponse {
  data: {
    categories: {
      nodes: Category[];
      pageInfo: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
    };
  };
}

export const fetchCategories = async () => {
  try {
    const { data } = await customFetch.post<CategoriesResponse>("/graphql", {
      query: GET_CATEGORIES,
      variables: {
        page: 1,
        limit: 100,
      },
    });
    
    return data?.data?.categories?.nodes || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};
