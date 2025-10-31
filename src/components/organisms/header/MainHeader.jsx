'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from './Navigation';

export default function MainHeader() {
  const handleClickShowMobileMenu = () => {
    console.log('show mobile menu');
  };

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-7 xl:px-0">
      <div className="xs:hidden h-[22px]">
        <button className="cursor-pointer" onClick={handleClickShowMobileMenu}>
          <Image
            src="/assets/icons/ic_menu.svg"
            alt="menu"
            width={22}
            height={22}
          />
        </button>
      </div>

      {/* 로고 */}
      <div>
        <h1>
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={100}
              height={18}
            />
          </Link>
        </h1>
      </div>

      {/* 네비게이션 */}
      <Navigation />
    </div>
  );
}
