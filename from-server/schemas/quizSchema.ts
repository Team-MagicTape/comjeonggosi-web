import { z } from 'zod';
import { QuizType, QuizDifficulty } from '@/models/Quiz';

const choiceSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean(),
});

export const createQuizSchema = z.object({
  body: z
    .object({
      type: z.nativeEnum(QuizType),
      category: z.string().min(1),
      subcategory: z.string().optional(),
      difficulty: z.nativeEnum(QuizDifficulty),
      question: z.string().min(1),
      choices: z.array(choiceSchema).min(2).optional(),
      answer: z.string().optional(),
      explanation: z.string().optional(),
      tags: z.array(z.string()).default([]),
      source: z.string().optional(),
      yearAppeared: z.number().optional(),
      metadata: z.record(z.string(), z.any()).optional(),
    })
    .refine(
      (data) => {
        if (data.type === QuizType.MULTIPLE_CHOICE) {
          return data.choices && data.choices.length >= 2 && data.choices.some((c) => c.isCorrect);
        }
        return !!data.answer;
      },
      {
        message:
          'Multiple choice questions must have choices with at least one correct answer, other types must have an answer',
      },
    ),
});

export const createQuizzesSchema = z.object({
  body: z.object({
    quizzes: z.array(createQuizSchema.shape.body),
  }),
});

export const updateQuizSchema = z.object({
  body: createQuizSchema.shape.body.partial(),
  params: z.object({
    quizId: z.string(),
  }),
});

export const getQuizSchema = z.object({
  params: z.object({
    quizId: z.string(),
  }),
});

export const getQuizzesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    type: z.nativeEnum(QuizType).optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    difficulty: z.nativeEnum(QuizDifficulty).optional(),
    tags: z.string().optional(),
    search: z.string().optional(),
    yearFrom: z.coerce.number().int().optional(),
    yearTo: z.coerce.number().int().optional(),
  }),
});

export const submitQuizAnswerSchema = z.object({
  body: z.object({
    answer: z.string().min(1),
  }),
  params: z.object({
    quizId: z.string(),
  }),
});

export const getQuizzesByCategorySchema = z.object({
  params: z.object({
    categoryId: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    difficulty: z.nativeEnum(QuizDifficulty).optional(),
    random: z.coerce.boolean().optional(),
  }),
});

export const getQuizByIdSchema = getQuizSchema;
export const getQuizzesQuerySchema = getQuizzesSchema;
export const submitQuizSchema = submitQuizAnswerSchema;

export type CreateQuizInput = z.infer<typeof createQuizSchema>['body'];
export type UpdateQuizInput = z.infer<typeof updateQuizSchema>['body'];
export type QuizParams = z.infer<typeof getQuizSchema>['params'];
export type GetQuizzesQuery = z.infer<typeof getQuizzesSchema>['query'];
export type SubmitAnswerInput = z.infer<typeof submitQuizAnswerSchema>['body'];
export type GetQuizzesByCategoryQuery = z.infer<typeof getQuizzesByCategorySchema>['query'];
