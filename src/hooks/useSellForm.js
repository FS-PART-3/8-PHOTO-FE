import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { sellFormSchema, sellFormDefaultValues } from '@/schema/sellingSchema';
import {
  CREATE_GRADE_OPTIONS,
  CREATE_GENRE_OPTIONS,
} from '@/constants/productConstants';

/**
 * 판매 폼 관리 커스텀 훅
 */
export function useSellForm(card, open) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sellFormSchema),
    defaultValues: sellFormDefaultValues,
    mode: 'onChange',
  });

  // 카드 정보로 폼 초기화
  useEffect(() => {
    if (!open) {
      reset(sellFormDefaultValues);
    } else if (card) {
      const gradeOption = CREATE_GRADE_OPTIONS.find(
        opt => opt.value === card.grade,
      );
      const genreOption = CREATE_GENRE_OPTIONS.find(
        opt => opt.value === card.genre,
      );

      setValue('grade', gradeOption?.value || '');
      setValue('genre', genreOption?.value || '');
      setValue('quantity', 1);
    }
  }, [open, card, reset, setValue]);

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    reset,
  };
}
