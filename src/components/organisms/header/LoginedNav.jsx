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
  const { accessToken } = useAuth();
  const { data: notificationList } = useNotificationList(accessToken);

  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const { useName, points } = useAuth();

  // points가 배열이고 첫 번째 요소가 객체인 경우 amount 값을 추출
  const pointsDisplay = Array.isArray(points)
    ? points.reduce((sum, pt) => sum + (pt?.amount || 0), 0)
    : 0;

  const handleClickShowAlarm = () => {
    console.log('show alarm');
    setIsAlarmOpen(!isAlarmOpen);
  };

  const handleClickLogout = () => {
    console.log('logout');
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
            {pointsDisplay} P
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
          {/* <button onClick={handleClickShowMenu} className="cursor-pointer">
            <span className="beskin-h6 text-[14px] font-bold text-gray-200">
              {userName || '유저'}
            </span>
          </button> */}
          <Profile userName={useName} point={pointsDisplay} />
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
