import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const updateUserProfileSchema = z.object({
  body: z.object({
    nickname: z.string().min(2).max(50).optional(),
    profileImageUrl: z.string().url().optional(),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
});

export const getUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    role: z.nativeEnum(UserRole).optional(),
    search: z.string().optional(),
  }),
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>['body'];
export type GetUserParams = z.infer<typeof getUserSchema>['params'];
export type GetUsersQuery = z.infer<typeof getUsersSchema>['query'];
