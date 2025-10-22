import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

// dayjs 플러그인 및 로케일 설정
dayjs.extend(relativeTime);
dayjs.locale('ko');

// 시간 포맷팅 함수
export const formatTimeAgo = timestamp => {
  if (!timestamp) return '';

  const now = dayjs();
  const targetTime = dayjs(timestamp);

  // 시간 차이 계산
  const diffInHours = now.diff(targetTime, 'hour');
  const diffInDays = now.diff(targetTime, 'day');
  const diffInWeeks = now.diff(targetTime, 'week');
  const diffInMonths = now.diff(targetTime, 'month');
  const diffInYears = now.diff(targetTime, 'year');

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
