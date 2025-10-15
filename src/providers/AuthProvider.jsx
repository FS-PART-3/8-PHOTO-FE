// 인증 프로바이더
'use client';

import { createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 인증 로직이 여기에 추가될 예정
  const value = {
    user: null,
    login: () => {},
    logout: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
