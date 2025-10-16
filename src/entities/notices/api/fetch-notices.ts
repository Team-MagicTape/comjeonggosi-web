import { apiClient } from "@/shared/libs/custom-axios";
import { Notice } from "@/entities/notices/types/notice";

export const fetchNotices = async (page = 1, limit = 5): Promise<Notice[]> => {
  try {
    const { data } = await apiClient.post<{
      data: { notices: { nodes: Notice[] } };
    }>("/api/graphql", {
      query: `
        query GetNotices($page: Int!, $limit: Int!) {
          notices(page: $page, limit: $limit) {
            nodes {
              id
              title
              content
              createdAt
            }
          }
        }
      `,
      variables: {
        page,
        limit,
      },
    });

    return data?.data?.notices?.nodes ?? [];
  } catch (error) {
    console.error("Notice api error:", error);
    return [];
  }
};
