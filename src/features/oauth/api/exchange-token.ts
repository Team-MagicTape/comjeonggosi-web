import { apiClient } from "@/shared/libs/custom-axios";

/**
 * ID token을 서버에 전송하여 access token과 refresh token을 받아옴
 */
export const exchangeToken = async (
  provider: "google" | "github" | "naver" | "kakao",
  idToken: string
) => {
  try {
    const { data } = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
    }>(`/api/auth/${provider}`, {
      idToken
    });
    return data;
  } catch (error) {
    console.error("exchangeToken error", error);
    throw error;
  }
};
