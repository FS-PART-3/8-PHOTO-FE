'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Alarm from '../Alarm';
import AlarmButton from '@/components/atoms/AlarmButton';
import useAuth from '@/store/userStore';
import Profile from '@/components/organisms/Profile';
import { useNotificationList } from '@/state/useNotificationQuery';

const alarmList = [
  {
    id: 1,
    isRead: false,
    message: '알림 메시지',
    createdAt: '2025-10-21 14:00:00',
  },
  {
    id: 2,
    isRead: true,
    message: '알림 메시지',
    createdAt: '2025-04-21 06:00:00',
  },
  {
    id: 3,
    isRead: false,
    message: '알림 메시지',
    createdAt: '2023-07-21 06:00:00',
  },
];

export default function LoginedNav() {
  const { accessToken, userName, points, logout } = useAuth();
  const { data: notificationList } = useNotificationList(accessToken);

  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const handleClickShowAlarm = () => {
    console.log('show alarm');
    setIsAlarmOpen(!isAlarmOpen);
  };

  const handleClickLogout = () => {
    console.log('logout');
    logout();
  };

  const hasUnreadAlarms = alarmList.some(alarm => !alarm.isRead);

  const handleClickCloseAlarm = () => {
    setIsAlarmOpen(false);
  };

  return (
    <>
      {/* 데스크탑 네비게이션 */}
      <ul className="xs:flex hidden items-center gap-4 sm:gap-7">
        <li>
          <span className="text-[14px] font-bold text-gray-200">
            {points} P
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
          <Profile userName={userName} point={points} />
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
            <Alarm alarmList={alarmList} onClose={handleClickCloseAlarm} />
          )}
        </li>
      </ul>
    </>
  );
}
