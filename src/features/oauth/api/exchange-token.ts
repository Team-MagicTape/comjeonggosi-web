export const sendAuthToken = async (
  provider: string,
  token: string
): Promise<void> => {
  const isGithub = provider === "github";
  const body = isGithub ? { code: token } : { idToken: token };

  const response = await fetch(`/api/auth/${provider}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Authentication failed" }));
    throw new Error(error.error || "Authentication failed");
  }
};
