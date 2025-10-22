import { z } from 'zod';
import { AchievementCategory } from '@prisma/client';

export const getAchievementLeaderboardSchema = z.object({
  query: z.object({
    category: z.nativeEnum(AchievementCategory).optional(),
    limit: z.string().default('50').transform(Number),
  }),
});

export const claimAchievementRewardSchema = z.object({
  params: z.object({
    achievementId: z.string().uuid(),
  }),
});

export type GetAchievementLeaderboardQuery = z.infer<
  typeof getAchievementLeaderboardSchema
>['query'];
export type ClaimAchievementRewardParams = z.infer<typeof claimAchievementRewardSchema>['params'];
