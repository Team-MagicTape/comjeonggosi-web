import { z } from 'zod';

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    categoryId: z.string().uuid(),
  }),
});

export const createArticlesSchema = z.object({
  body: z.object({
    articles: z.array(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        categoryId: z.string().uuid(),
      }),
    ),
  }),
});

export const updateArticleSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
    categoryId: z.string().uuid().optional(),
  }),
  params: z.object({
    articleId: z.string().uuid(),
  }),
});

export const getArticleSchema = z.object({
  params: z.object({
    articleId: z.string().uuid(),
  }),
});

export const getArticlesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    categoryId: z.string().uuid().optional(),
    authorId: z.string().uuid().optional(),
    search: z.string().optional(),
    onlyDeleted: z.coerce.boolean().optional(),
  }),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>['body'];
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>['body'];
export type ArticleParams = z.infer<typeof getArticleSchema>['params'];
export type GetArticlesQuery = z.infer<typeof getArticlesSchema>['query'];
