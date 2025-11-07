'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import marketService from '@/services/marketService';

export function useRejectExchangeOfferMutation(listingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: offerId => marketService.rejectExchangeOffer(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['exchange', 'received', listingId],
      });
      queryClient.invalidateQueries({
        queryKey: ['exchange', 'mine', listingId],
      });
      queryClient.invalidateQueries({
        queryKey: ['market', 'detail', listingId],
      });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
