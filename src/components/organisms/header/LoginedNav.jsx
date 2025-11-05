'use client';

import { useState } from 'react';
import Alarm from '../Alarm';
import AlarmButton from '@/components/atoms/AlarmButton';
import Profile from '@/components/molecules/Profile';

import useAuth from '@/store/userStore';
import { useNotificationList } from '@/state/useNotificationQuery';

export default function LoginedNav() {
  const { accessToken, logout, points } = useAuth();

  const { data: notificationList } = useNotificationList(accessToken);

  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const handleClickShowAlarm = () => {
    console.log('show alarm');
    setIsAlarmOpen(!isAlarmOpen);
  };

  const handleClickLogout = () => {
    logout();
    console.log('logout');
  };

  const hasUnreadAlarms = notificationList?.data?.some(alarm => !alarm.isRead);

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
        <li className="relative">
          <AlarmButton
            isAlarm={hasUnreadAlarms}
            onClick={handleClickShowAlarm}
          />
          {isAlarmOpen && <Alarm alarmList={notificationList} />}
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
        <li className="h-[24px]">
          <AlarmButton
            isAlarm={hasUnreadAlarms}
            onClick={handleClickShowAlarm}
          />
          {isAlarmOpen && (
            <Alarm
              alarmList={notificationList}
              onClose={handleClickCloseAlarm}
            />
          )}
        </li>
      </ul>
    </>
  );
}
