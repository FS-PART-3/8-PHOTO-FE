'use client';

import { useState } from 'react';
import styles from './Profile.module.css';
import Link from 'next/link';

export default function Profile() {
  const userName = '유저 네임';
  const point = 300;

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-fit">
      <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.userName}>{userName}</span>
      </button>
      {isOpen && (
        <div className="absolute right-[0] flex h-fit w-[260px] flex-col bg-[#161616]">
          <div className="flex h-fit w-[100%] flex-col gap-[20px] p-[20px]">
            <span
              className={styles.profileMsg}
            >{`안녕하세요, ${userName}님!`}</span>
            <div className="flex justify-between">
              <span className={styles.pointLabel}>보유 포인트</span>
              <span className={styles.point}>{`${point}P`}</span>
            </div>
          </div>
          <div className={styles.dividerH}></div>
          <div className="flex flex-col gap-[15px] p-[20px]">
            <Link href="/" className={styles.goto}>
              마켓플레이스
            </Link>
            <Link href="/" className={styles.goto}>
              마이갤러리
            </Link>
            <Link href="/" className={styles.goto}>
              판매 중인 포토카드
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
