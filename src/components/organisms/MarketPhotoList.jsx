'use client';

import ProductCard from './card/ProductCard';
import Modal from './modal/Modal';
import { MARKET_CARD_TYPE } from '@/constants/productConstants';

export default function MarketPhotoList({
  cards,
  isPending,
  isError,
  isAuthed,
  loginOpen,
  onLoginClose,
  onLoginConfirm,
  onCardClick,
}) {
  if (isPending) {
    return (
      <div className="mx-auto max-w-[1200px] py-8">
        <p className="text-white/70">불러오는 중</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-[1200px] py-8">
        <p className="text-red">데이터 로드 실패</p>
      </div>
    );
  }

  return (
    <>
      {cards && cards.length > 0 ? (
        <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-4 py-8">
          {cards.map(listing => (
            <div key={listing.id} onClick={() => onCardClick(listing)}>
              <ProductCard
                type={MARKET_CARD_TYPE.ORIGINAL}
                cardId={listing.id}
                title={listing.photoCards?.[0]?.title}
                grade={listing.photoCards?.[0]?.grade}
                genre={listing.photoCards?.[0]?.genre}
                imageUrl={listing.photoCards?.[0]?.imgUrl}
                status={listing.status}
                price={listing.price}
                quantity={listing.quantity}
                initQuantity={listing.initQuantity}
                userName={listing.seller?.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-[1200px] border border-[var(--color-gray-400)] py-16 text-center text-white">
          등록된 상품이 없습니다.
        </div>
      )}

      <Modal
        isOpen={loginOpen}
        onClose={onLoginClose}
        title="로그인이 필요합니다."
        description={`로그인 하시겠습니까?\n다양한 서비스를 편리하게 이용하실 수 있습니다.`}
        confirmText="확인"
        onConfirm={onLoginConfirm}
        cancelText="닫기"
        onCancel={onLoginClose}
        width="md"
      />
    </>
  );
}
