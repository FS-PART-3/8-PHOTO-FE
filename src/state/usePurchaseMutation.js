'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import marketService from '@/services/marketService';
import { useRouter } from 'next/navigation';
/**
 * 포토카드 구매 요청 훅
 * @param {string} listingId - 판매글 ID
 */

export function usePurchaseMutation(listingId) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ quantity }) =>
      marketService.purchase(listingId, Number(quantity)),
    // vars: { title, grade, quantity }
    onSuccess: (_data, vars) => {
      const title = vars?.title ?? '';
      const grade = vars?.grade ?? '';
      const count = Math.max(1, Number(vars?.quantity ?? 1));
      // 구매 성공 시, 마켓 상세 & 목록 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ['market', 'detail', listingId],
      });
      queryClient.invalidateQueries({ queryKey: ['market', 'list'] });

      const qs = new URLSearchParams({
        title: title,
        grade: grade,
        count: String(count),
      }).toString();

      // 구매 성공 페이지로 이동
      router.replace(`/market/${listingId}/purchase-success?${qs}`);
    },

    onError: (_err, vars) => {
      const title = vars?.title ?? '';
      const grade = vars?.grade ?? '';
      const count = Math.max(1, Number(vars?.quantity ?? 1));

      const qs = new URLSearchParams({
        title: title,
        grade: grade,
        count: String(count),
      }).toString();
      router.replace(`/market/${listingId}/purchase-fail?${qs}`);
    },
  });
}
