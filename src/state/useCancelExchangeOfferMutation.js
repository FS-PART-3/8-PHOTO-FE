'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import marketService from '@/services/marketService';

export function useCancelExchangeOfferMutation(listingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: offerId => marketService.cancelExchangeOffer(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['market', 'received-exchange-offers', listingId],
      });
      queryClient.invalidateQueries({
        queryKey: ['market', 'my-exchange-offers', listingId],
      });
      queryClient.invalidateQueries({
        queryKey: ['market', 'detail', listingId],
      });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
