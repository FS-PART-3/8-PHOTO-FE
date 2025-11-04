// 인증 프로바이더
'use client';

import useAuth from '@/store/userStore';
import { useEffect } from 'react';

export function AuthProvider({ children }) {
  // 인증 로직이 여기에 추가될 예정
  const { userName, getUserData, checkAuth, accessToken } = useAuth();
  useEffect(() => {
    if (accessToken) {
      //유저 정보가 있으면, 서버 갱신 여부와 상관없이 새로 안 받아옵니다.
      //포인트의 변화가 있어도 최신화 안됩니다.
      if (!userName) {
        getUserData();
      }
    }
  }, []);

  return <>{children}</>;
}
