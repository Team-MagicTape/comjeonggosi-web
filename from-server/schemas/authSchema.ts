import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    nickname: z.string().min(2).max(50),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

export const googleAuthSchema = z.object({
  body: z.object({
    idToken: z.string(),
  }),
});

export const kakaoAuthSchema = z.object({
  body: z.object({
    idToken: z.string(),
  }),
});

export const naverAuthSchema = z.object({
  body: z.object({
    idToken: z.string(),
  }),
});

export const githubAuthSchema = z.object({
  body: z.object({
    code: z.string(),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>['body'];
export type GoogleAuthInput = z.infer<typeof googleAuthSchema>['body'];
export type KakaoAuthInput = z.infer<typeof kakaoAuthSchema>['body'];
export type NaverAuthInput = z.infer<typeof naverAuthSchema>['body'];
export type GithubAuthInput = z.infer<typeof githubAuthSchema>['body'];
