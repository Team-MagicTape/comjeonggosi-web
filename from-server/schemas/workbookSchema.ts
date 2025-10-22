import { z } from 'zod';

export const createWorkbookSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1),
  }),
});

export const updateWorkbookSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().min(1).optional(),
  }),
  params: z.object({
    workbookId: z.string().uuid(),
  }),
});

export const getWorkbookSchema = z.object({
  params: z.object({
    workbookId: z.string().uuid(),
  }),
});

export const getWorkbooksSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().optional(),
    onlyDeleted: z.coerce.boolean().optional(),
  }),
});

export const addQuizToWorkbookSchema = z.object({
  body: z.object({
    quizId: z.string(),
  }),
  params: z.object({
    workbookId: z.string().uuid(),
  }),
});

export const removeQuizFromWorkbookSchema = z.object({
  params: z.object({
    workbookId: z.string().uuid(),
    quizId: z.string(),
  }),
});

export const getWorkbookQuizzesSchema = z.object({
  params: z.object({
    workbookId: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});

export const getWorkbookByIdSchema = getWorkbookSchema;

export type CreateWorkbookInput = z.infer<typeof createWorkbookSchema>['body'];
export type UpdateWorkbookInput = z.infer<typeof updateWorkbookSchema>['body'];
export type WorkbookParams = z.infer<typeof getWorkbookSchema>['params'];
export type GetWorkbooksQuery = z.infer<typeof getWorkbooksSchema>['query'];
export type AddQuizInput = z.infer<typeof addQuizToWorkbookSchema>['body'];
export type RemoveQuizParams = z.infer<typeof removeQuizFromWorkbookSchema>['params'];
export type GetWorkbookQuizzesQuery = z.infer<typeof getWorkbookQuizzesSchema>['query'];
