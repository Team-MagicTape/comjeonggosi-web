import { apiClient } from "@/shared/libs/custom-axios";

/**
 * authorization code를 서버에 전송하여 access token과 refresh token을 받아옴
 */
export const exchangeToken = async (
  provider: "google" | "github" | "naver" | "kakao",
  code: string
) => {
  try {
    const { data } = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
    }>(`/api/auth/${provider}`, {
      code
    });
    return data;
  } catch (error) {
    console.error("exchangeToken error", error);
    throw error;
  }
};
