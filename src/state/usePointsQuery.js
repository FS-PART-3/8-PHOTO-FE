import { useInfiniteQuery } from '@tanstack/react-query';
import { getPointsHistoryListings } from '@/services/pointsService';
/**
 * 포인트 히스토리 조회 훅
 */
export const usePointsHistoryListings = (params = {}, options = {}) => {
  const take = 10;
  return useInfiniteQuery({
    queryKey: ['pointshistory', params],
    queryFn: ({ pageParam }) =>
      getPointsHistoryListings({
        ...params,
        cursor: pageParam, // cursor 파라미터 추가
        take, // 한 번에 가져올 개수
      }),
    initialPageParam: undefined, // 첫 페이지는 cursor 없이 시작
    getNextPageParam: lastPage => {
      // 응답에서 data 배열 가져오기
      const items = lastPage.data ?? [];

      // 데이터가 10개 미만이면 마지막 페이지로 간주
      if (items.length < take) {
        return undefined;
      }

      // 마지막 아이템의 ID를 다음 cursor로 반환
      const nextCursor = items[items.length - 1]?.id;

      return nextCursor;
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
