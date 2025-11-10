'use client';

import { use } from 'react';
import SellerDetailPageComponent from '@/components/pages/SellerDetailPage';
import { useMarketDetailQuery } from '@/state/useMarketDetailQuery';

export default function SellerPage({ params }) {
  const { id } = use(params);
  const listingId = String(id);

  const { data: detail, isLoading } = useMarketDetailQuery(listingId);

  if (isLoading || !detail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-black)] text-white/70">
        불러오는 중...
      </main>
    );
  }

  return <SellerDetailPageComponent listingId={listingId} />;
}
