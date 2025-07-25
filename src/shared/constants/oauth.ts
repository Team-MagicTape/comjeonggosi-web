const base = process.env.NEXT_PUBLIC_API_URL+"/oauth2/authorization/";

export const GOOGLE_OAUTH_LINK = `${base}google` as const;
export const GITHUB_OAUTH_LINK = `${base}github` as const;
export const NAVER_OAUTH_LINK = `${base}naver` as const;
export const KAKAO_OAUTH_LINK = `${base}kakao` as const;