import { z } from 'zod';

export const createQuestionSchema = z.object({
  body: z.object({
    day: z.number().min(1),
    categoryId: z.string().uuid(),
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    answer: z.string().min(1),
  }),
});

export const createQuestionsSchema = z.object({
  body: z.object({
    questions: z.array(
      z.object({
        day: z.number().min(1),
        categoryId: z.string().uuid(),
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        answer: z.string().min(1),
      }),
    ),
  }),
});

export const updateQuestionSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
    answer: z.string().min(1).optional(),
  }),
  params: z.object({
    questionId: z.string().uuid(),
  }),
});

export const getQuestionSchema = z.object({
  params: z.object({
    questionId: z.string().uuid(),
  }),
});

export const getQuestionsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    categoryId: z.string().uuid().optional(),
    day: z.coerce.number().int().optional(),
  }),
});


export type CreateQuestionInput = z.infer<typeof createQuestionSchema>['body'];
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>['body'];
export type QuestionParams = z.infer<typeof getQuestionSchema>['params'];
export type GetQuestionsQuery = z.infer<typeof getQuestionsSchema>['query'];
