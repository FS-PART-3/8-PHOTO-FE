import fetchClient from '@/lib/fetchClient';

export const getNotificationList = async () => {
  try {
    const result = await fetchClient.authGet('/api/notifications');
    return result;
  } catch (error) {
    console.error('알림 목록 조회 중 오류가 발생했습니다.');
    throw error;
  }
};
