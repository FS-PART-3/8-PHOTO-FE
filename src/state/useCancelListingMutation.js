'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import marketService from '@/services/marketService';

export function useCancelListingMutation(listingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => marketService.cancelListing(listingId),
    onSuccess: () => {
      // 상세/목록/내 판매/알림 등 갱신
      queryClient.invalidateQueries({
        queryKey: ['market', 'detail', listingId],
      });
      queryClient.invalidateQueries({ queryKey: ['market', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['market', 'my-selling'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
