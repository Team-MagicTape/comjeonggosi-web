import { User } from "@/entities/user/types/user";
import { saveUser } from "@/shared/utils/user-storage";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const sendAuthToken = async (
  provider: string,
  token: string
): Promise<User> => {
  const isGithub = provider === "github";
  const body = isGithub ? { code: token } : { idToken: token };

  const response = await fetch(`/api/auth/${provider}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'include', // 쿠키 포함
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Authentication failed" }));
    throw new Error(error.error || "Authentication failed");
  }

  const data: AuthResponse = await response.json();
  
  // User를 localStorage에 저장
  saveUser(data.user);
  
  return data.user;
};
