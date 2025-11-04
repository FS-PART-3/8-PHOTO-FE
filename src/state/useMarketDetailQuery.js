'use client';

import { useQuery } from '@tanstack/react-query';
import marketService from '@/services/marketService';
import { QUERY_KEYS } from '@/constants/queryKeys';

export function useMarketDetailQuery(listingId, options = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MARKET.DETAIL, listingId],
    queryFn: () => marketService.getListingDetail(listingId),
    enabled: Boolean(listingId),
    staleTime: 60 * 1000,
    ...options,
  });
}
