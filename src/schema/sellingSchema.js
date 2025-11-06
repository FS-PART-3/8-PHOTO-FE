import { z } from 'zod';

/**
 * 판매 등록 폼 스키마
 */
export const sellFormSchema = z.object({
  price: z
    .string()
    .min(1, '가격을 입력해주세요.')
    .refine(val => /^\d+$/.test(val), '숫자만 입력 가능합니다.')
    .refine(val => parseInt(val, 10) > 0, '가격은 0보다 커야 합니다.'),
  quantity: z
    .number()
    .min(1, '수량은 최소 1개 이상이어야 합니다.')
    .int('수량은 정수여야 합니다.'),
  grade: z
    .string()
    .min(1, '등급을 선택해주세요.')
    .refine(val => val !== '', { message: '등급을 선택해주세요.' }),
  genre: z
    .string()
    .min(1, '장르를 선택해주세요.')
    .refine(val => val !== '', { message: '장르를 선택해주세요.' }),
  description: z.string().min(1, '교환 희망 설명을 입력해주세요.'),
});

/**
 * 판매 등록 폼 기본값
 */
export const sellFormDefaultValues = {
  price: '',
  quantity: 1,
  grade: '',
  genre: '',
  description: '',
};
