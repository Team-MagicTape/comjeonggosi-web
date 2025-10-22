import { z } from 'zod';

export const getStreakStatsSchema = z.object({
  params: z.object({
    userId: z.string().uuid().optional(),
  }),
});

export const getStreakCalendarSchema = z.object({
  params: z.object({
    userId: z.string().uuid().optional(),
  }),
  query: z.object({
    year: z.coerce.number().int(),
    month: z.coerce.number().int().min(1).max(12),
  }),
});

export const getStreakLeaderboardSchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().positive().max(100).default(50),
  }),
});

export const getFriendStreakComparisonSchema = z.object({
  body: z.object({
    friendIds: z.array(z.string().uuid()),
  }),
});

export type GetStreakStatsParams = z.infer<typeof getStreakStatsSchema>['params'];
export type GetStreakCalendarParams = z.infer<typeof getStreakCalendarSchema>['params'];
export type GetStreakCalendarQuery = z.infer<typeof getStreakCalendarSchema>['query'];
export type GetStreakLeaderboardQuery = z.infer<typeof getStreakLeaderboardSchema>['query'];
export type GetFriendStreakComparisonInput = z.infer<
  typeof getFriendStreakComparisonSchema
>['body'];
