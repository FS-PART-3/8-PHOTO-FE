import ProtectedLink from '@/components/molecules/ProtectedLink';
import Link from 'next/link';

export default async function PurchaseSuccessPage({ params, searchParams }) {
  const sp = await searchParams;
  const title = sp?.title ? decodeURIComponent(sp.title) : '';
  const grade = sp?.grade ?? '';
  const count = Number(sp?.count ?? 1);

  return (
    <main className="min-h-screen bg-[var(--color-black)] text-white">
      <div className="mx-auto flex min-h-screen w-[min(960px,92vw)] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-8 text-5xl font-extrabold text-[var(--color-white)]">
            구매 <span className="text-[var(--color-main)]">성공</span>
          </h1>

          <p className="mb-12 text-lg text-[var(--color-white)]">
            [{grade || '—'}
            {title ? ` | ${title}` : ''}] {count}장 구매에 성공했습니다!
          </p>

          <ProtectedLink
            href="/market/my-photo"
            className="inline-block rounded border border-white/40 px-8 py-4 text-base transition hover:bg-white hover:text-black"
          >
            마이갤러리에서 확인하기
          </ProtectedLink>
        </div>
      </div>
    </main>
  );
}
