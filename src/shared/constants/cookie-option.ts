export const ACCESSTOKEN_COOKIE_OPTION = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  maxAge: 60 * 5,
  secure: process.env.NODE_ENV === "production",
  // 개발 환경에서는 domain을 설정하지 않음 (localhost를 위해)
  ...(process.env.NODE_ENV === "production" && { domain: ".comgo.dev" }),
};

export const REFRESHTOKEN_COOKIE_OPTION = {
  httpOnly: true,
  path: "/",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 30,
  secure: process.env.NODE_ENV === "production",
  // 개발 환경에서는 domain을 설정하지 않음 (localhost를 위해)
  ...(process.env.NODE_ENV === "production" && { domain: ".comgo.dev" }),
};
