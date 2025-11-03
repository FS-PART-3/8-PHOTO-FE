'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from '@/store/userStore';

//구글 소셜 로그인 성공 시에 리다이렉트 되는 페이지입니다.
export default function OAuthRedirectPage() {
  const query = useSearchParams(); //클라이언트 컴포넌트 한정 쿼리 파라미터 훅.
  const router = useRouter();
  const { setAccessToken, getRefreshToken } = useAuth();

  useEffect(() => {
    const accessToken = query.get('accessToken');

    if (accessToken) {
      setAccessToken(accessToken); //1. 액세스토큰을 로컬에 저장.
      getRefreshToken(accessToken); //2.리프레쉬 토큰 요청 후 백엔드가 쿠키에 저장해줌.
      // 3. 메인 페이지 등으로 이동
      router.push('/');
    } else {
      // 실패 처리
      alert('로그인 실패');
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}
