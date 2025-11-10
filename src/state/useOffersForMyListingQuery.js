'use client';

import { useQuery } from '@tanstack/react-query';
import marketService from '@/services/marketService';

export function useOffersForMyListingQuery(listingId) {
  return useQuery({
    queryKey: ['exchange', 'received', listingId],
    queryFn: () => marketService.getOffersForMyListing(listingId),
    enabled: !!listingId,
  });
}
