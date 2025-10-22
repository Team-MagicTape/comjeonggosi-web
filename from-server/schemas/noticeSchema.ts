import { z } from 'zod';

export const createNoticeSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
  }),
});

export const createNoticesSchema = z.object({
  body: z.object({
    notices: z.array(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
      }),
    ),
  }),
});

export const updateNoticeSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
  }),
  params: z.object({
    noticeId: z.string().uuid(),
  }),
});

export const getNoticeSchema = z.object({
  params: z.object({
    noticeId: z.string().uuid(),
  }),
});

export const getNoticesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    onlyDeleted: z.coerce.boolean().optional(),
  }),
});

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>['body'];
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>['body'];
export type NoticeParams = z.infer<typeof getNoticeSchema>['params'];
export type GetNoticesQuery = z.infer<typeof getNoticesSchema>['query'];
