'use client';

import Link from 'next/link';

export default function UnLoginedNav() {
  return (
    <>
      {/* 데스크탑 네비게이션 */}
      <ul className="xs:flex hidden items-center gap-7">
        <li>
          <Link href="/sign-in">
            <span className="text-[14px] text-gray-200">로그인</span>
          </Link>
        </li>
        <li>
          <Link href="/sign-up">
            <span className="text-[14px] text-gray-200">회원가입</span>
          </Link>
        </li>
      </ul>

      {/* 모바일 네비게이션 */}
      <ul className="xs:hidden flex flex-col items-center gap-4">
        <li>
          <Link href="/sign-in">
            <span className="text-[14px] text-gray-200">로그인</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
