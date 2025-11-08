'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { getPathType } from '@/utils/authUtils';
import { isExpired } from '@/utils/jwtUtils';
import useAuth from '@/store/userStore';
import useAsync from '@/hooks/useAsync';
import LoadingDots from './LoadingDots';

export default function ProtectedLink({ href, children, ...props }) {
  const { accessToken, hasHydrated, refresh, logout } = useAuth();
  const router = useRouter();
  const [pending, error, setError, refreshFunc] = useAsync(refresh);

  const handleClick = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasHydrated) return;
    const pathType = getPathType(href);

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

    router.push(href); // 인증 통과 시 수동 이동
  };

  if (!hasHydrated || pending) return <LoadingDots />;

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
