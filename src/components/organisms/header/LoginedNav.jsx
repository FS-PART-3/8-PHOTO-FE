'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LoginedNav() {
  const handleClickShowMenu = () => {
    console.log('show menu');
  };

  const handleClickShowAlarm = () => {
    console.log('show alarm');
  };

  const handleClickLogout = () => {
    console.log('logout');
  };

  const [userInfo, setUserInfo] = useState({
    name: '기타',
    point: 1540,
  });

  const [isAlarm, setIsAlarm] = useState(false);

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
        <li>
          <button onClick={handleClickShowAlarm} className="cursor-pointer">
            <span>
              <Image
                src={`/assets/icons/ic_alarm_${isAlarm ? 'active' : 'default'}.svg`}
                alt="alarm"
                width={24}
                height={24}
              />
            </span>
          </button>
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
          <button onClick={handleClickShowAlarm} className="cursor-pointer">
            <span>
              <Image
                src={`/assets/icons/ic_alarm_${isAlarm ? 'active' : 'default'}.svg`}
                alt="alarm"
                width={24}
                height={24}
              />
            </span>
          </button>
        </li>
      </ul>
    </>
  );
}
