'use client';

import GalleryGrid from '@/components/organisms/GalleryGrid';
import ProductCard from '@/components/organisms/card/ProductCard';
import { MARKET_CARD_TYPE } from '@/constants/productConstants';

export default function MyPhotoList({
  cards,
  isPending,
  isError,
  error,
  searchQuery,
  hasFilters,
}) {
  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-lg text-white">로딩 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">에러가 발생했습니다</p>
          <p className="mt-2 text-sm text-gray-400">
            {error?.message || '데이터를 불러올 수 없습니다.'}
          </p>
        </div>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="empty-state flex min-h-[400px] items-center justify-center rounded-lg border border-[var(--color-gray-400)] bg-[var(--color-gray-500)]">
        <p className="text-lg text-gray-400">
          {searchQuery.trim() || hasFilters
            ? '검색 조건에 맞는 포토카드가 없습니다.'
            : '등록된 포토카드가 없습니다.'}
        </p>
      </div>
    );
  }

  return (
    <GalleryGrid>
      {cards.map(card => (
        <ProductCard
          key={card.id}
          type={MARKET_CARD_TYPE.MY_CARD}
          cardId={card.id}
          title={card.title}
          grade={card.grade}
          genre={card.genre}
          imageUrl={card.imgUrl}
          price={card.price}
          quantity={card.quantity}
          description={card.description}
        />
      ))}
    </GalleryGrid>
  );
}
