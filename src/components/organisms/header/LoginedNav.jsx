'use client';

import Image from 'next/image';
import { useState } from 'react';
import Alarm from '../Alarm';
import AlarmButton from '@/components/atoms/AlarmButton';

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
  const handleClickShowMenu = () => {
    console.log('show menu');
  };

  const handleClickShowAlarm = () => {
    console.log('show alarm');
    setIsAlarmOpen(!isAlarmOpen);
  };

  const handleClickLogout = () => {
    console.log('logout');
  };

  const [userInfo, setUserInfo] = useState({
    name: '기타',
    point: 1540,
  });

  const hasUnreadAlarms = alarmList.some(alarm => !alarm.isRead);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const handleClickCloseAlarm = () => {
    setIsAlarmOpen(false);
  };

  return (
    <>
      {/* 데스크탑 네비게이션 */}
      <ul className="xs:flex hidden items-center gap-4 sm:gap-7">
        <li>
          <span className="text-[14px] font-bold text-gray-200">
            {userInfo.point} P
          </span>
        </li>
        {/* 알림 */}
        <li className="relative">
          <AlarmButton
            isAlarm={hasUnreadAlarms}
            onClick={handleClickShowAlarm}
          />
          {isAlarmOpen && (
            <Alarm alarmList={alarmList} onClose={handleClickCloseAlarm} />
          )}
        </li>
        {/* 사용자 */}
        <li>
          <button onClick={handleClickShowMenu} className="cursor-pointer">
            <span className="beskin-h6 text-[14px] font-bold text-gray-200">
              {userInfo.name}
            </span>
          </button>
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
