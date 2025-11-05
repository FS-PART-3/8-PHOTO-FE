'use client';
import { useQuery } from '@tanstack/react-query';
import marketService from '@/services/marketService';

export function useMyExchangeOffersQuery(listingId) {
  return useQuery({
    queryKey: ['exchange', 'mine', listingId],
    queryFn: async () => {
      const res = await marketService.getMyExchangeOffers(listingId);
      const items = Array.isArray(res?.items) ? res.items : res;
      return Array.isArray(items) ? items : [];
    },
    enabled: !!listingId,
    staleTime: 30_000,
  });
}
