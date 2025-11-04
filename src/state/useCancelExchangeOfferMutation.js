'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import marketService from '@/services/marketService';

export function useCancelExchangeOfferMutation(listingId) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: offerId => marketService.cancelExchangeOffer(offerId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['market', 'my-exchange-offers', listingId],
      });
      qc.invalidateQueries({ queryKey: ['market', 'detail', listingId] });
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
