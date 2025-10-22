import { User } from "@/entities/user/types/user";
import { apiClient } from "@/shared/libs/custom-axios";
import { saveUser } from "@/shared/utils/user-storage";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const sendAuthToken = async (provider: string, token: string) => {
  try {
    const isGithub = provider === "github";
    const body = JSON.stringify(
      isGithub ? { code: token } : { idToken: token }
    );

    const { data } = await apiClient.post<AuthResponse>(
      `/api/auth/${provider}`,
      body
    );
    console.log("ok");

    if (!data) {
      throw new Error("Authentication failed");
    }

    // User를 localStorage에 저장
    saveUser(data.user);

    return data.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};
