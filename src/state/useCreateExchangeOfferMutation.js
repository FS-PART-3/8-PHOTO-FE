'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import marketService from '@/services/marketService';
export function useCreateExchangeOfferMutation(listingId) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: payload => {
      const body = {
        offeredDescription: String(payload?.offeredDescription ?? '').trim(),
        offeredPhotoId: payload?.offeredPhotoId,
      };

      if (!body.offeredPhotoId) {
        throw new Error('교환할 내 카드가 선택되지 않았습니다.');
      }
      if (!body.offeredDescription) {
        throw new Error('교환 설명을 입력해주세요.');
      }

      const id = encodeURIComponent(listingId);
      console.log('[교환 요청 바디]', { listingId: id, ...body });
      return marketService.createExchangeOffer(listingId, body);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ['market', 'detail', listingId],
      });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({
        queryKey: ['market', 'my-exchange-offers', listingId],
      });
      queryClient.invalidateQueries({
        queryKey: ['market', 'received-exchange-offers', listingId],
      });
      const desc = vars?.offeredDescription ?? '';
      const qs = new URLSearchParams({ desc }).toString();
      router.replace(
        `/market/${encodeURIComponent(listingId)}/exchange-success?${qs}`,
      );
    },
    onError: (_err, vars) => {
      const desc = vars?.offeredDescription ?? '';
      const qs = new URLSearchParams({ desc }).toString();

      router.replace(
        `/market/${encodeURIComponent(listingId)}/exchange-fail?${qs}`,
      );
    },
  });
}
