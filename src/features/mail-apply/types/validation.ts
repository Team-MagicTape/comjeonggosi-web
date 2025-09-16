import { z } from "zod";

export const mailApplySchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  selectedCategoryIds: z
    .array(z.number())
    .min(1, "최소 1개 이상의 주제를 선택해주세요"),
  time: z.number().min(0).max(23),
});

export type MailApplyFormData = z.infer<typeof mailApplySchema>;
