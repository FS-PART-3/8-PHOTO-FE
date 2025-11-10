'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import marketService from '@/services/marketService';
import QUERY_KEYS from '@/constants/queryKeys';

export function useUpdateListingMutation(listingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => marketService.updateListing(listingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MARKET.DETAIL(listingId),
      });
      queryClient.invalidateQueries({
        queryKey: ['exchange', 'received', listingId],
      });
    },
  });
}
