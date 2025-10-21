import { OAUTH_PROVIDERS } from "@/shared/constants/oauth-providers";

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];