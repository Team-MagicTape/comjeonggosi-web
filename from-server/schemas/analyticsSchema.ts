import { z } from 'zod';

export const getUserAnalyticsSchema = z.object({
  query: z
    .object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.startDate && data.endDate) {
          return new Date(data.startDate) <= new Date(data.endDate);
        }
        return true;
      },
      {
        message: 'Start date must be before end date',
      },
    ),
});

export const getCategoryTrendsSchema = z.object({
  params: z.object({
    categoryId: z.string().uuid(),
  }),
  query: z.object({
    days: z.string().default('30').transform(Number),
  }),
});

export const getComparisonAnalyticsSchema = z.object({
  body: z.object({
    userIds: z.array(z.string().uuid()).min(1).max(5),
  }),
});

export type GetUserAnalyticsQuery = z.infer<typeof getUserAnalyticsSchema>['query'];
export type GetCategoryTrendsParams = z.infer<typeof getCategoryTrendsSchema>['params'];
export type GetCategoryTrendsQuery = z.infer<typeof getCategoryTrendsSchema>['query'];
export type GetComparisonAnalyticsBody = z.infer<typeof getComparisonAnalyticsSchema>['body'];
