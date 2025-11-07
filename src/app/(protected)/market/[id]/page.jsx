'use client';
import { useEffect } from 'react';
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
  const { user } = useAuth();
  const myUserId = user?.id;

  const { data: detail, isLoading } = useMarketDetailQuery(listingId);

  useEffect(() => {
    if (!isLoading && detail && myUserId && detail.sellerId === myUserId) {
      router.replace(`/market/my-selling/${listingId}`);
    }
  }, [detail, myUserId, isLoading, listingId, router]);
  if (isLoading) {
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
