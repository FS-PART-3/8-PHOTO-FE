import fetchClient from '@/lib/fetchClient';

<<<<<<< HEAD
export const getNotificationList = async () => {
  try {
    const result = await fetchClient.authGet('/api/notifications');
    return result;
  } catch (error) {
    console.error('알림 목록 조회 중 오류가 발생했습니다.');
    throw error;
  }
=======
export const notificationService = {
  getNotificationList({ cursor, limit = 5 } = {}) {
    const url = cursor
      ? `/api/notifications?cursor=${cursor}&limit=${limit}`
      : `/api/notifications?limit=${limit}`;
    return fetchClient.authGet(url);
  },

  readNotification(notificationId) {
    return fetchClient.authPatch(`/api/notifications/${notificationId}/read`, {
      body: {
        notificationId,
      },
    });
  },
>>>>>>> 8d993f85242ba90a28ea097d9af409bf98e303fa
};
