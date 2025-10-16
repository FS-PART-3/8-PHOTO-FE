'use client';

import { useState } from 'react';
import UnLoginedNav from './UnLoginedNav';
import LoginedNav from './LoginedNav';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav>
      {isLoggedIn ? (
        /* 로그인 유저 */
        <LoginedNav />
      ) : (
        /* 비로그인 유저 */
        <UnLoginedNav />
      )}
    </nav>
  );
}
