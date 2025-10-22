import { z } from 'zod';

export const getAdminWorkbooksSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().optional(),
    onlyDeleted: z.coerce.boolean().optional(),
  }),
});

export const getAdminWorkbookByIdSchema = z.object({
  params: z.object({
    workbookId: z.string().uuid(),
  }),
});

export const updateAdminWorkbookSchema = z.object({
  params: z.object({
    workbookId: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().min(1).optional(),
  }),
});

export type GetAdminWorkbooksQuery = z.infer<typeof getAdminWorkbooksSchema>['query'];
export type AdminWorkbookParams = z.infer<typeof getAdminWorkbookByIdSchema>['params'];
export type UpdateAdminWorkbookInput = z.infer<typeof updateAdminWorkbookSchema>['body'];
