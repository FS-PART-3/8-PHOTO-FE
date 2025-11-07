import { useMutation, useQueryClient } from '@tanstack/react-query';
import { photoService } from '@/services/photoService';
import useAuth from '@/store/userStore';
import { QUERY_KEYS } from '@/constants/queryKeys';

/**
 * 포토카드 판매 등록 Mutation
 *
 * @returns {Object} Mutation 객체
 */
export function useCreateListingMutation() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async data => {
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
      }
      return photoService.createListing(accessToken, data);
    },
    onSuccess: () => {
      // 마이갤러리, 마켓플레이스, 내 판매목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_GALLERY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MARKETPLACE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_SELLING] });
    },
  });
}
