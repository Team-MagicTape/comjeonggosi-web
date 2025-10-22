import { z } from 'zod';

export const createSubscriptionSchema = z.object({
  body: z.object({
    hour: z.number().min(0).max(23),
    categoryIds: z.array(z.string().uuid()).min(1),
    email: z.string().email().optional(),
  }),
});

export const updateSubscriptionSchema = z.object({
  body: z.object({
    hour: z.number().min(0).max(23).optional(),
    categoryIds: z.array(z.string().uuid()).min(1).optional(),
    email: z.string().email().optional(),
  }),
  params: z.object({
    subscriptionId: z.string().uuid(),
  }),
});

export const pauseSubscriptionSchema = z.object({
  params: z.object({
    subscriptionId: z.string().uuid(),
  }),
});

export const resumeSubscriptionSchema = z.object({
  params: z.object({
    subscriptionId: z.string().uuid(),
  }),
});

export const deleteSubscriptionSchema = z.object({
  params: z.object({
    subscriptionId: z.string().uuid(),
  }),
});

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>['body'];
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>['body'];
export type SubscriptionParams = z.infer<typeof updateSubscriptionSchema>['params'];
