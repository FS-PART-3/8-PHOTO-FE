'use client';

import Link from 'next/link';

export default async function PurchaseFailPage({ params, searchParams }) {
  const sp = await searchParams;
  const title = sp?.title ? decodeURIComponent(sp.title) : '';
  const grade = sp?.grade ?? '';
  const count = Number(sp?.count ?? 1);

  return (
    <main className="min-h-screen bg-[var(--color-black)] text-white">
      <div className="mx-auto flex min-h-screen w-[min(960px,92vw)] items-center justify-center">
        <div className="text-center">
          {/* 타이틀 */}
          <h1 className="mb-8 text-5xl font-extrabold text-[var(--color-white)]">
            구매 <span className="text-[var(--color-gray-300)]">실패</span>
          </h1>

          {/* 실패 내용 */}
          <p className="mb-12 text-lg text-[var(--color-white)]">
            [{grade || '—'}
            {title ? ` | ${title}` : ''}] {count}장 구매에 실패했습니다.
          </p>

          {/* 버튼 */}
          <Link
            href="/market"
            className="inline-block rounded border border-white/40 px-8 py-4 text-base transition hover:bg-white hover:text-black"
          >
            마켓플레이스로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
