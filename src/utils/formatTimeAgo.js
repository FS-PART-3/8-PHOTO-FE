// 시간 포맷팅 함수
export const formatTimeAgo = timestamp => {
  if (!timestamp) return '';

  const now = new Date();
  const targetTime = new Date(timestamp);
  const diffInMs = now - targetTime;

  // 밀리초를 각 단위로 변환
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // 1시간~23시간 내는 시간으로 표시
  if (diffInHours >= 1 && diffInHours <= 23) {
    return `${diffInHours}시간 전`;
  }

  // 24시간 이후~6일 이내는 하루 단위 표시
  if (diffInDays >= 1 && diffInDays <= 6) {
    return `${diffInDays}일 전`;
  }

  // 7일부터는 1주일 전 ~ 3주전으로 표시
  if (diffInWeeks >= 1 && diffInWeeks <= 3) {
    return `${diffInWeeks}주일 전`;
  }

  // 4주부터는 1개월전, 2개월 전 ~ 11개월 전으로 표시
  if (diffInMonths >= 1 && diffInMonths <= 11) {
    return `${diffInMonths}개월 전`;
  }

  // 12개월 부터는 1년 단위로 표시
  if (diffInYears >= 1) {
    return `${diffInYears}년 전`;
  }

  // 1시간 미만인 경우
  return '방금 전';
};
