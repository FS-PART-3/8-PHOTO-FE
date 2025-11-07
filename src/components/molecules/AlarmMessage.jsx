'use client';

import { useReadNotification } from '@/state/useNotificationQuery';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

// 알림 컴포넌트
export default function AlarmMessage({
  isRead = false,
  id,
  message,
  createdAt,
  ...props
}) {
  const formattedTime = formatTimeAgo(createdAt);
  const defaultStyles =
    'p-[20px] flex flex-col gap-[10px] border-b border-gray-400';

  // is_read 값에 따라 상태 클래스 반환 (false: 읽지 않음, true: 읽음)
  const getStateClasses = () => {
    return isRead ? 'text-gray-300' : 'bg-half-white text-[var(--color-white)]';
  };

  const { mutate: readNotification } = useReadNotification(id);

  const handleClick = () => {
    readNotification();
  };

  const responsiveStyles =
    'xs:h-[107px] xs:w-[300px] xs:text-[16px] h-[87px] w-full text-[12px]';

  return (
    <div
      className={`${defaultStyles} ${getStateClasses()} ${responsiveStyles}`}
      onClick={handleClick}
      {...props}
    >
      <span>{message}</span>
      <span className="text-gray-300">{formattedTime}</span>
    </div>
  );
}
