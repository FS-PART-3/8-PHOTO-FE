// 인증 프로바이더
'use client';

import useAuth from '@/store/userStore';
import { createContext, useContext, useEffect } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 인증 로직이 여기에 추가될 예정
  const { userName, points, getUserData } = useAuth();
  useEffect(() => {
    if (!userName) {
      getUserData();
    }
  }, [userName]);

  const value = { userName, points };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserData = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context; //useStore(context, selector);
};
