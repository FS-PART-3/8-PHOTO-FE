import { useQuery } from '@tanstack/react-query';
import { photoService } from '@/services/photoService';
import { QUERY_KEYS } from '@/constants/queryKeys';

/**
 * 마이갤러리 포토카드 목록 조회 Query
 *
 * @param {string} token - 인증 토큰
 * @param {Object} params - 쿼리 파라미터
 * @returns {Object} Query 결과
 */
export function useMyGallery(token, params = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_GALLERY, params],
    queryFn: () => photoService.getMyGalleryPhotos(token, params),
    enabled: !!token,
    staleTime: 0, // 캐시 무효화
  });
}
