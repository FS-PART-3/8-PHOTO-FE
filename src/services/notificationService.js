import fetchClient from '@/lib/fetchClient';

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
};
