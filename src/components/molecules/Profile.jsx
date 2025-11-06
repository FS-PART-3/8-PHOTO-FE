'use client';

import { useState } from 'react';
import Link from 'next/link';
import useAuth from '@/store/userStore';
import ProtectedLink from './ProtectedLink';

export default function Profile() {
  const { userName, points } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-0 w-fit">
      <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="beskin-h6 text-white">{userName || '유저명'}</span>
      </button>
      {isOpen && (
        <div className="absolute right-[0] z-10 flex h-fit w-[260px] flex-col divide-y-1 divide-solid divide-[#5a5a5a] bg-[#161616]">
          <div className="flex h-fit w-full flex-col gap-[20px] p-[20px]">
            <span className="text-[18px] font-bold text-[#ddd]">{`안녕하세요, ${userName || ''}님!`}</span>
            <div className="flex justify-between">
              <span className="font-weight text-[12px] text-[#a4a4a4]">
                보유 포인트
              </span>
              <span className="text-[12px] font-normal text-[#efff04]">{`${points || ''}P`}</span>
            </div>
          </div>
          <div className="flex flex-col gap-[15px] p-[20px]">
            <ProtectedLink
              href="/market"
              className="text-[14px] font-bold text-white"
            >
              마켓플레이스
            </ProtectedLink>
            <ProtectedLink
              href="/market/my-photo"
              className="text-[14px] font-bold text-white"
            >
              마이갤러리
            </ProtectedLink>
            <ProtectedLink
              href="/market/my-selling"
              className="text-[14px] font-bold text-white"
            >
              판매 중인 포토카드
            </ProtectedLink>
            <ProtectedLink
              href="/my"
              className="text-[14px] font-bold text-white"
            >
              마이페이지
            </ProtectedLink>
          </div>
        </div>
      )}
    </div>
  );
}
