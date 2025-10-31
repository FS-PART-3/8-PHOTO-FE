'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Profile({ userName, point }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-['BR_B'] text-[18px] font-bold text-gray-200">
          {userName || '유저'}
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 flex w-[260px] flex-col bg-[#161616]">
          <div className="flex w-full flex-col gap-5 p-5">
            <span className="font-['Noto_Sans_KR'] text-[18px] font-bold text-white">{`안녕하세요, ${userName}님!`}</span>
            <div className="flex justify-between">
              <span className="font-['Noto_Sans_KR'] text-[12px] font-light text-gray-300">
                보유 포인트
              </span>
              <span className="text-right font-['Noto_Sans_KR'] text-[12px] font-normal text-[#efff04]">
                {`${point}P`}
              </span>
            </div>
          </div>
          <div className="w-full border-t border-[#5a5a5a]" />
          <div className="flex flex-col gap-[15px] p-5">
            <Link
              href="/market"
              className="font-['Noto_Sans_KR'] text-[14px] font-bold text-white"
            >
              마켓플레이스
            </Link>
            <Link
              href="/market/my-photo"
              className="font-['Noto_Sans_KR'] text-[14px] font-bold text-white"
            >
              마이갤러리
            </Link>
            <Link
              href="/market/my-selling"
              className="font-['Noto_Sans_KR'] text-[14px] font-bold text-white"
            >
              판매 중인 포토카드
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
