// 인증 프로바이더
'use client';

import useAuth from '@/store/userStore';
import { isExpired } from '@/utils/jwtUtils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPathType } from '@/utils/authUtils';
import LoadingDots from '@/components/molecules/LoadingDots';
import useAsync from '@/hooks/useAsync';
import { hydrate } from '@tanstack/react-query';

export function AuthProvider({ children }) {
  const {
    hasHydrated,
    accessToken,
    userName,
    points,
    getUserData,
    refresh,
    logout,
  } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const pathType = getPathType(pathName);
  const [pending, error, setError, refreshFunc] = useAsync(refresh);

  useEffect(() => {
    //페이지 권한 검사를 프로바이더에서 하는 게 정석인지 잘 모르겠습니다...
    //고민고민 끝에 (로컬 토큰 저장 = 클라이언트 방식 = 프로바이더) 형태로 정착했지만,
    //제가 만든 권한 검사 로직이 올바른지도 잘 모르겠습니다..
    //auth 너무 어렵습니다.
    const check = async () => {
      if (pathType === 'protected') {
        if (!accessToken) {
          logout();
          router.replace('/sign-in');
          return;
        }
        if (isExpired(accessToken)) {
          const result = await refreshFunc();
          if (!result?.accessToken) {
            logout();
            router.replace('/sign-in');
            return;
          }
        }
      }

      if (pathType === 'ghestOnly' && accessToken) {
        if (isExpired(accessToken)) {
          const result = await refreshFunc();
          if (result?.accessToken) {
            router.replace('/my');
          } else {
            logout();
          }
        } else {
          router.replace('/my');
          return;
        }
      }
    };

    const reload = async () => {
      if (pathType !== 'ghestOnly' && accessToken) {
        if (!userName || !points) {
          getUserData();
        }
      }
    };

    if (hasHydrated) {
      reload();
      check();
    }
  }, [pathName, hasHydrated, accessToken]);

  if (!hasHydrated || pending) {
    return <LoadingDots />;
  }

  return <>{children}</>;
}
