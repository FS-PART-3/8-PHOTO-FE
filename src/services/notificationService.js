export const getNotificationList = async token => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.json();
  } catch (error) {
    console.error('알림 목록 조회 중 오류가 발생했습니다.');
    throw error;
  }
};
