import { customFetch } from "@/shared/libs/custom-fetch";
import { Category } from "../types/category";

/**
 * 삭제된 카테고리 포함 목록 조회 (GraphQL)
 */
export const fetchDeletedCategories = async () => {
  try {
    // GraphQL query for fetching deleted categories
    const query = `
      {
        categories(onlyDeleted : true) {
          nodes {
            id
            name
            description
          }
        }
      }
    `;

    const response = await customFetch.post<{
      data: { deletedCategories: Category[] };
    }>("/graphql", {
      query,
    });

    return response.data.data.deletedCategories;
  } catch (e) {
    console.error("fetchDeletedCategories error", e);
    return [];
  }
};
