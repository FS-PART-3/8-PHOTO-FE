'use client';

import { useQuery } from '@tanstack/react-query';
import marketService from '@/services/marketService';

export function useMyExchangeOffersQuery(listingId) {
  return useQuery({
    queryKey: ['market', 'my-exchange-offers', listingId],
    queryFn: () => marketService.getMyExchangeOffers(listingId),
    enabled: !!listingId && !!accessToken,
    staleTime: 60 * 1000,
  });
}
