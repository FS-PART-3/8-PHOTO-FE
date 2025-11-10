'use client';

import Image from 'next/image';
import Navigation from './Navigation';
import ProtectedLink from '@/components/molecules/ProtectedLink';
import useAuth from '@/store/userStore';
import { isTokenNotExpired } from '@/utils/jwtUtils';

export default function MainHeader() {
  const { accessToken } = useAuth();
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
          <ProtectedLink
            // 로그인 된 시점과 안된 시점의 '홈'이 달라야 할 것 같아 수정했습니다.
            href={isTokenNotExpired(accessToken) ? '/market' : '/'}
          >
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={100}
              height={18}
            />
          </ProtectedLink>
        </h1>
      </div>

      {/* 네비게이션 */}
      <Navigation />
    </div>
  );
}
