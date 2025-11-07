import { useQuery } from '@tanstack/react-query';
import { getNotificationList } from '@/services/notificationService';

/**
 * 알림 목록 조회 훅
 * @param {Object} options - 쿼리 옵션
 * @returns {Promise} API 응답
 */
export const useNotificationList = (options = {}) =>
  useQuery({
    queryKey: ['notification-list'],
    queryFn: () => getNotificationList(),
    enabled: true,
    staleTime: 1000 * 30, // 30초
    ...options,
  });
