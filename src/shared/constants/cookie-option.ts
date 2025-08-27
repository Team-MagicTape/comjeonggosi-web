export const ACCESSTOKEN_COOKIE_OPTION = {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 5,
  secure: process.env.NODE_ENV === "production",
  domain: ".proxia.kr",
} as const;

export const REFRESHTOKEN_COOKIE_OPTION = {
  httpOnly: true,
  path: "/",
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 30,
  secure: process.env.NODE_ENV === "production",
  domain: ".proxia.kr",
} as const;
