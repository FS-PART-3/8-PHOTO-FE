import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
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

/**
 * 마켓플레이스 포토카드 조회 훅
 */
export const useMarketplaceListings = (token, params = {}, options = {}) =>
  useInfiniteQuery({
    queryKey: ['marketplace', params],
    queryFn: ({ pageParam }) =>
      photoService.getMarketplaceListings(token, {
        ...params,
        cursor: pageParam, // cursor 파라미터 추가
        take: 15, // 한 번에 가져올 개수
      }),
    initialPageParam: undefined, // 첫 페이지는 cursor 없이 시작
    getNextPageParam: lastPage => {
      // 응답에서 data 배열 가져오기
      const items = lastPage.data ?? [];

      // 데이터가 15개 미만이면 마지막 페이지로 간주
      if (items.length < 15) {
        return undefined;
      }

      // 마지막 아이템의 ID를 다음 cursor로 반환
      const nextCursor = items[items.length - 1]?.id;

      return nextCursor;
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  });
