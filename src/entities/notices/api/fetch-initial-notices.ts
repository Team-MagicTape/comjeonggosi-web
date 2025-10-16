import { Notice } from "@/entities/notices/types/notice";
import { customFetch } from "@/shared/libs/custom-fetch";

export const fetchInitialNotices = async (): Promise<Notice[]> => {
  try {
    const { data } = await customFetch.post<{
      data: { notices: { nodes: Notice[] } };
    }>("/graphql", {
      query: `
        query {
          notices {
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
