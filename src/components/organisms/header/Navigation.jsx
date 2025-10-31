'use client';

import UnLoginedNav from './UnLoginedNav';
import LoginedNav from './LoginedNav';
import useAuth from '@/store/userStore';

export default function Navigation() {
  const { accessToken } = useAuth();

  return (
    <nav>
      {accessToken ? (
        /* 로그인 유저 */
        <LoginedNav />
      ) : (
        /* 비로그인 유저 */
        <UnLoginedNav />
      )}
    </nav>
  );
}
