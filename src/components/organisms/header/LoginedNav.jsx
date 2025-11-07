'use client';

import { useState, useRef } from 'react';
import Alarm from '../Alarm';
import AlarmButton from '@/components/atoms/AlarmButton';
import Profile from '@/components/molecules/Profile';
import useClickOutside from '@/hooks/useClickOutside';

import useAuth from '@/store/userStore';
import { useNotificationList } from '@/state/useNotificationQuery';

export default function LoginedNav() {
  const { logout, points } = useAuth();

  const {
    data: notificationData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotificationList();

  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const alarmRef = useRef(null);

  // 외부 클릭 시 알림 닫기
  useClickOutside(alarmRef, () => setIsAlarmOpen(false));

  const handleClickShowAlarm = () => {
    console.log('show alarm');
    setIsAlarmOpen(!isAlarmOpen);
  };

  const handleClickLogout = () => {
    logout();
    console.log('logout');
  };

  // 모든 페이지의 알림을 확인하여 읽지 않은 알림이 있는지 체크
  const hasUnreadAlarms =
    notificationData?.pages?.some(page =>
      page.data?.some(alarm => !alarm.isRead),
    ) || false;

  const handleClickCloseAlarm = () => {
    setIsAlarmOpen(false);
  };

  return (
    <>
      {/* 데스크탑 네비게이션 */}
      <ul className="xs:flex hidden items-center gap-4 sm:gap-7">
        <li>
          <span className="text-[14px] font-bold text-gray-200">
            {points || 0} P
          </span>
        </li>
        {/* 알림 */}
        <li className="relative" ref={alarmRef}>
          <AlarmButton
            isAlarm={hasUnreadAlarms}
            onClick={handleClickShowAlarm}
          />
          {isAlarmOpen && (
            <Alarm
              alarmPages={notificationData?.pages}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onClose={handleClickCloseAlarm}
            />
          )}
        </li>
        {/* 사용자 */}
        <li>
          <Profile />
        </li>
        <li className="h-4 w-px bg-gray-200 text-white"></li>
        <li>
          <button onClick={handleClickLogout} className="cursor-pointer">
            <span className="text-[14px] text-gray-200">로그아웃</span>
          </button>
        </li>
      </ul>

      {/* 모바일 네비게이션 */}
      <ul className="xs:hidden flex flex-col items-center gap-4">
        <li className="h-[24px]" ref={alarmRef}>
          <AlarmButton
            isAlarm={hasUnreadAlarms}
            onClick={handleClickShowAlarm}
          />
          {isAlarmOpen && (
            <Alarm
              alarmPages={notificationData?.pages}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onClose={handleClickCloseAlarm}
            />
          )}
        </li>
      </ul>
    </>
  );
}
