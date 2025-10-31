import { useQuery } from '@tanstack/react-query';
import { photoService } from '@/services/photoService';

/**
 * 마이갤러리 포토카드 조회 훅
 */
export const useMyGalleryPhotos = (token, params = {}, options = {}) => {
  const {
    page = 0,
    size = 12,
    search = '',
    grade = '',
    genre = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = params;

  return useQuery({
    queryKey: [
      'my-gallery',
      page,
      size,
      search,
      grade,
      genre,
      sortBy,
      sortOrder,
    ],
    queryFn: () => photoService.getMyGalleryPhotos(token, params),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true, // 윈도우 포커스 시 다시 fetching
    refetchOnMount: true, // 컴포넌트 마운트 시 다시 fetching
    ...options,
  });
};
