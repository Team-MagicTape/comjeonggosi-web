import { z } from 'zod';

export const getDueReviewsSchema = z.object({
  query: z.object({
    categoryId: z.string().uuid().optional(),
    limit: z.coerce.number().int().positive().max(100).default(10),
  }),
});

export const markReviewCompleteSchema = z.object({
  params: z.object({
    reviewId: z.string().uuid(),
  }),
  body: z.object({
    isCorrect: z.boolean(),
  }),
});

export const getReviewCalendarSchema = z.object({
  query: z.object({
    year: z.coerce.number().int(),
    month: z.coerce.number().int().min(1).max(12),
  }),
});

export type GetDueReviewsQuery = z.infer<typeof getDueReviewsSchema>['query'];
export type MarkReviewCompleteParams = z.infer<typeof markReviewCompleteSchema>['params'];
export type MarkReviewCompleteBody = z.infer<typeof markReviewCompleteSchema>['body'];
export type GetReviewCalendarQuery = z.infer<typeof getReviewCalendarSchema>['query'];
