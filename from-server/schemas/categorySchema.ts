import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(500).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const getCategorySchema = z.object({
  params: z.object({
    categoryId: z.string().uuid(),
  }),
});

export const getCategoriesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    parentId: z.string().uuid().optional(),
    onlyDeleted: z.coerce.boolean().optional(),
  }),
});

export const getCategoryByIdSchema = getCategorySchema;

export const getCategoryQuizzesSchema = z.object({
  params: z.object({
    categoryId: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
    random: z.coerce.boolean().optional(),
  }),
});

export const getCategoryArticlesSchema = z.object({
  params: z.object({
    categoryId: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});

export const getCategoryQuestionsSchema = z.object({
  params: z.object({
    categoryId: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    day: z.coerce.number().int().optional(),
  }),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>['body'];
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>['body'];
export type CategoryParams = z.infer<typeof getCategorySchema>['params'];
export type GetCategoriesQuery = z.infer<typeof getCategoriesSchema>['query'];
export type CategoryQuizzesQuery = z.infer<typeof getCategoryQuizzesSchema>['query'];
export type CategoryQuestionsQuery = z.infer<typeof getCategoryQuestionsSchema>['query'];
export type CategoryArticlesQuery = z.infer<typeof getCategoryArticlesSchema>['query'];
