'use client';

import ProtectedLink from '@/components/molecules/ProtectedLink';
import Link from 'next/link';

export default async function ExchangeFailPage({ params, searchParams }) {
  const sp = await searchParams;
  const title = sp?.title ? decodeURIComponent(sp.title) : '';

  return (
    <main className="min-h-screen bg-[var(--color-black)] text-white">
      <div className="mx-auto flex min-h-screen w-[min(960px,92vw)] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-8 text-5xl font-extrabold text-[var(--color-white)]">
            교환 제시 <span className="text-[var(--color-gray-300)]">실패</span>
          </h1>

          <p className="mb-12 text-lg text-[var(--color-white)]">
            포토카드 교환 제시에 실패했습니다.
          </p>

          <ProtectedLink
            href="/market"
            className="inline-block rounded border border-white/40 px-8 py-4 text-base transition hover:bg-white hover:text-black"
          >
            마켓플레이스로 돌아가기
          </ProtectedLink>
        </div>
      </div>
    </main>
  );
}
