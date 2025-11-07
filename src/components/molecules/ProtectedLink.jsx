import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { getPathType } from '@/utils/authUtils';
import { isExpired } from '@/utils/jwtUtils';
import useAuth from '@/store/userStore';
import LoadingDots from './LoadingDots';

export default function ProtectedLink({ href, children, ...props }) {
  const { accessToken, hasHydrated } = useAuth();
  const router = useRouter();

  const handleClick = e => {
    if (accessToken === undefined) {
      e.preventDefault();
      return;
    }

    const pathType = getPathType(href);
    if (
      pathType === 'protected' &&
      (accessToken === '' || isExpired(accessToken))
    ) {
      e.preventDefault(); // 페이지 이동 막기
      router.replace('/sign-in'); // 인증 실패 시 리디렉션
      return;
    }
    if (pathType === 'ghestOnly' && accessToken) {
      e.preventDefault(); // 페이지 이동 막기
      router.replace('/'); // 인증 실패 시 리디렉션
      return;
    }
    // 인증 통과 시는 그냥 Link가 처리함
  };

  return (
    <>
      {hasHydrated ? (
        <Link href={href} onClick={handleClick} {...props}>
          {children}
        </Link>
      ) : (
        <LoadingDots />
      )}
    </>
  );
}
