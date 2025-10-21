import { apiClient } from "@/shared/libs/custom-axios";
import { OAuthProvider } from "../types/oauth-provider";

/**
 * authorization code를 서버에 전송하여 access token과 refresh token을 받아옴
 */
export const exchangeToken = async (
  provider: OAuthProvider,
  code: string
) => {
  try {
    const { status } = await apiClient.post(`/api/auth/${provider}`, {
      code
    });
    return status;
  } catch (error) {
    console.error("exchangeToken error", error);
    throw error;
  }
};
