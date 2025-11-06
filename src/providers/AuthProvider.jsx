// 인증 프로바이더
'use client';

import useAuth from '@/store/userStore';
import { useEffect } from 'react';

export function AuthProvider({ children }) {
  const { accessToken, userName, points, getUserData, checkAuth, logout } =
    useAuth();
  useEffect(() => {
    const reload = async () => {
      if (accessToken) {
        const res = await checkAuth();
        if (res.authenticated) {
          if (!userName || !points) {
            getUserData();
          }
        } else {
          logout();
        }
      }
    };

    reload();
  }, [accessToken]);

  return <>{children}</>;
}
