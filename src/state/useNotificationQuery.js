import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { notificationService } from '@/services/notificationService';
import QUERY_KEYS from '@/constants/queryKeys';

/**
 * 알림 목록 조회 훅 (무한 스크롤 - cursor 기반)
 * @param {Object} options - 쿼리 옵션
 * @returns {Promise} API 응답
 */
export const useNotificationList = (options = {}) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: ({ pageParam }) =>
      notificationService.getNotificationList({
        cursor: pageParam,
        limit: 5,
      }),
    getNextPageParam: lastPage =>
      // cursor 기반 페이지네이션
      // API 응답 구조: { data: [...], pagination: { hasMore: boolean, nextCursor: string } }
      lastPage?.pagination?.hasMore
        ? lastPage.pagination.nextCursor
        : undefined,
    initialPageParam: undefined,
    staleTime: 1000 * 30, // 30초
    refetchInterval: 1000 * 30, // 30초
    refetchIntervalInBackground: false, // 탭이 백그라운드에 있을 때는 리패치하지 않음
    refetchOnWindowFocus: true, // 탭이 포커스될 때 리패치
    ...options,
  });

export const useReadNotification = notificationId => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationService.readNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
      });
    },
    onError: error => {
      console.error(error);
    },
  });
};
