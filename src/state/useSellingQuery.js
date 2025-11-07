import { useQuery } from '@tanstack/react-query';
import { sellingService } from '@/services/sellingService';

export const useMySellingPhotos = (params = {}, options = {}) =>
  useQuery({
    queryKey: ['my-selling-photos', params],
    queryFn: () => sellingService.getMySellingPhotos(params),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
