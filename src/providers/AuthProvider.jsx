// 인증 프로바이더
'use client';

import useAuth from '@/store/userStore';
import { isExpired } from '@/utils/jwtUtils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPathType } from '@/utils/authUtils';
import LoadingDots from '@/components/molecules/LoadingDots';

export function AuthProvider({ children }) {
  const pathName = usePathname();
  const {
    hasHydrated,
    accessToken,
    userName,
    points,
    getUserData,
    checkAuth,
    logout,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const reload = async () => {
      const pathType = getPathType(pathName);
      if (hasHydrated) {
        if (pathType === 'protected') {
          if (accessToken) {
            //만료되었다면, 다시 토큰 유효성 검사 요청.
            if (isExpired(accessToken)) {
              const res = await checkAuth();
              if (res.authenticated) {
              } else {
                //자동 리프레쉬 후 검사도 통과하지 못했다면,
                logout();
                router.push('/'); //랜딩 페이지로 이동
                return;
              }
            }
            /* 인증 통과 */
            if (!userName || !points) {
              getUserData();
            }
          } else {
            router.push('/'); //랜딩페이지로 이동
          }
        }

        if (pathType === 'ghestOnly') {
          if (accessToken) {
            router.push('/my'); //랜딩페이지로 이동
          }
        }

        if (pathType === 'free') {
          if (accessToken) {
            //만료되었다면, 다시 토큰 유효성 검사 요청.
            if (!isExpired(accessToken)) {
              const res = await checkAuth();
              if (res.authenticated) {
                if (!userName || !points) {
                  getUserData();
                }
              }
            }
          }
        }
      }
    };
    reload();
  }, [accessToken, pathName]);

  if (!hasHydrated) {
    return <LoadingDots />;
  }

  return <>{children}</>;
}
