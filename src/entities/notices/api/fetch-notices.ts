import { apiClient } from "@/shared/libs/custom-axios";
import { Notice } from "@/entities/notices/types/notice";

export const fetchNotices = async (): Promise<Notice[]> => {
  try {
    const { data } = await apiClient.post<{
      data: { notices: { nodes: Notice[] } };
    }>("/api/graphql", {
      query: `
        query {
          notices(page: 1, limit: 5) {
            nodes {
              id
              title
              content
              createdAt
            }
          }
        }
      `,
    });

    return data?.data?.notices?.nodes ?? [];
  } catch (error) {
    console.error("Notice api error:", error);
    return [];
  }
};
