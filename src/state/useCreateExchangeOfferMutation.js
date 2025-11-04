'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import marketService from '@/services/marketService';
export function useCreateExchangeOfferMutation(listingId) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: payload =>
      marketService.createExchangeOffer(listingId, payload),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['market', 'detail', listingId],
      });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({
        queryKey: ['market', 'my-exchange-offers', listingId],
      });
      const desc = vars?.offeredDescription ?? '';
      const qs = new URLSearchParams({ desc }).toString();
      router.replace(
        `/market/${encodeURIComponent(listingId)}/exchange-success?${qs}`,
      );
    },
    onError: (err, vars) => {
      const desc = vars?.offeredDescription ?? '';
      const qs = new URLSearchParams({ desc }).toString();

      const serverMsg =
        err?.data?.message ||
        (Array.isArray(err?.data?.errors) && err.data.errors[0]?.message) ||
        err?.message ||
        '교환 신청에 실패했어요. 잠시 후 다시 시도해 주세요.';
      console.group('exchange error');
      console.error('message:', err?.message);
      console.error('status:', err?.status, err?.statusText);
      console.error('data:', err?.data); // zod validator 메시지/비즈니스 에러
      console.error('sent vars:', vars);
      console.groupEnd();
      console.log('serverMsg:', serverMsg);
      router.replace(
        `/market/${encodeURIComponent(listingId)}/exchange-fail?${qs}`,
      );
    },
  });
}
