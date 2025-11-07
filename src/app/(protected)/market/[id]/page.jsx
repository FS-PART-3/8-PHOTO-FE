'use client';
import { useEffect, useMemo } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/store/userStore';
import MarketDetailPageComponent from '@/components/pages/MarketDetailPage';
import { useMarketDetailQuery } from '@/state/useMarketDetailQuery';
// 포토카드 상세페이지
export default function MarketDetailPage({ params }) {
  const { id } = use(params);
  const listingId = String(id);

  const router = useRouter();
  const { accessToken, hasHydrated } = useAuth();

  // 토큰에서 내 userId 추출
  const myUserId = useMemo(() => {
    const payload = decodeJwtPayload(accessToken);
    return payload?.userId ?? null;
  }, [accessToken]);

  // 판매글 상세 가져오기
  const {
    data: detail,
    isLoading,
    isError,
    error,
  } = useMarketDetailQuery(listingId, { enabled: Boolean(listingId) });

  useEffect(() => {
    if (!hasHydrated) return;
    if (isLoading) return;
    if (!detail || !myUserId) return;

    if (detail.sellerId === myUserId) {
      router.replace(`/market/my-selling/${listingId}`);
    }
  }, [hasHydrated, isLoading, detail, myUserId, listingId, router]);

  if (!hasHydrated || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-black)] text-white/70">
        불러오는 중...
      </main>
    );
  }

  {
    /* MarketDetailPage 컴포넌트가 여기에 추가될 예정 */
  }
  return <MarketDetailPageComponent listingId={listingId} />;
}
function decodeJwtPayload(token) {
  try {
    if (!token) return null;
    const [, payload] = token.split('.');
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}
