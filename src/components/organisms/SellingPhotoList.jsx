'use client';

import GalleryGrid from '../organisms/GalleryGrid';
import ProductCard from '../organisms/card/ProductCard';

export default function SellingPhotoList({ cards, isPending, isError }) {
  if (isPending) {
    return <div className="py-10 text-center text-white">로딩 중</div>;
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">에러가 발생했습니다.</div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="py-10 text-center text-white">
        판매 중인 포토카드가 없습니다.
      </div>
    );
  }

  return (
    <GalleryGrid>
      {cards.map(item => (
        <ProductCard
          key={item.id}
          type="for-sale"
          cardId={item.id}
          title={item.title}
          grade={item.grade}
          genre={item.genre}
          imageUrl={item.imageUrl}
          watermarkUrl={item.watermarkUrl}
          status={item.status}
          price={item.price}
          quantity={item.quantity}
          initQuantity={item.initQuantity}
          userName={item.user.name}
        />
      ))}
    </GalleryGrid>
  );
}
