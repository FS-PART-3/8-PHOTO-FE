'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/store/userStore';
import SellerDetailPage from '@/components/pages/SellerDetailPage';
import { useMarketDetailQuery } from '@/state/useMarketDetailQuery';

export default function SellerPage({ params }) {
  const { id } = use(params);
  const listingId = String(id);

  const router = useRouter();
  const { accessToken, user } = useAuth();
  const myUserId = user?.id;

  const { data: detail, isLoading } = useMarketDetailQuery(listingId);

  // 로그인 안 되어 있으면 일반 상세로 이동
  // useEffect(() => {
  //   if (!accessToken) router.replace(`/market/${listingId}`);
  // }, [accessToken, listingId, router]);

  // // 내가 판매자가 아니면 일반 상세로 이동
  // useEffect(() => {
  //   if (!isLoading && detail && myUserId && detail.sellerId !== myUserId) {
  //     router.replace(`/market/${listingId}`);
  //   }
  // }, [detail, myUserId, isLoading, listingId, router]);

  if (isLoading || !detail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-black)] text-white/70">
        불러오는 중...
      </main>
    );
  }

  return <SellerDetailPage listingId={listingId} />;
}
