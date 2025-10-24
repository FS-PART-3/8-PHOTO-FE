import { fetchMarketplaceListings } from '@/lib/marketplace';
import ProductCard from '@/components/cards/ProductCard';

export const revalidate = 0;

export default async function MarketPage() {
  const items = await fetchMarketplaceListings();

  return (
    <section className="mx-auto w-[min(1200px,92vw)] py-8">
      <h1 className="mb-6 text-2xl font-semibold text-white">마켓플레이스</h1>

      {items.length === 0 ? (
        <p className="text-white/70">판매 중인 카드가 없습니다.</p>
      ) : (
        <div
          className="
            grid gap-4
            sm:grid-cols-2 md:gap-5 md:grid-cols-3
            xl:grid-cols-4
          "
        >
          {items.map((it) => (
            <ProductCard key={it.id} {...it} />
          ))}
        </div>
      )}
    </section>
  );
}
