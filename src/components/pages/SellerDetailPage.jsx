'use client';

import Image from 'next/image';
import { useState } from 'react';

import CardSellerInfo from '@/components/organisms/card/CardSellerInfo';
import ReceivedExchangeCard from '@/components/organisms/exchange/ReceivedExchangeCard';
import SellerEditModal from '@/components/organisms/selling/SellerEditModal';
import SellCancelModal from '@/components/organisms/selling/SellCancelModal';
import ExchangeAcceptModal from '@/components/organisms/exchange/ExchangeAcceptModal';
import ExchangeRejectModal from '@/components/organisms/exchange/ExchangeRejectModal';

import { useMarketDetailQuery } from '@/state/useMarketDetailQuery';
import { useOffersForMyListingQuery } from '@/state/useOffersForMyListingQuery';
import { useAcceptExchangeOfferMutation } from '@/state/useAcceptExchangeOfferMutation';
import { useRejectExchangeOfferMutation } from '@/state/useRejectExchangeOfferMutation';
import { useUpdateListingMutation } from '@/state/useUpdateListingMutation';
import { useCancelListingMutation } from '@/state/useCancelListingMutation';
import { useRouter } from 'next/navigation';

export default function SellerDetailPageComponent({ listingId }) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const { data, isLoading, error } = useMarketDetailQuery(listingId);
  const receivedQ = useOffersForMyListingQuery(listingId);
  const acceptMut = useAcceptExchangeOfferMutation(listingId);
  const rejectMut = useRejectExchangeOfferMutation(listingId);
  const updateMut = useUpdateListingMutation(listingId);
  const cancelMut = useCancelListingMutation(listingId);

  if (isLoading) return <div className="p-10 text-white">로딩중...</div>;
  if (error)
    return <div className="p-10 text-red-400">오류: {error.message}</div>;
  if (!data) return null;

  const {
    myPhotoCard,
    seller,
    price,
    quantity,
    initQuantity,
    preferredGrade,
    preferredGenre,
    preferredDescription,
    status,
  } = data;

  // undefined 에러 방지용
  const title = myPhotoCard?.title ?? '';
  const imgUrl = myPhotoCard?.imgUrl ?? '';
  const sellerName = seller?.name ?? '알 수 없음';
  const cardGrade = myPhotoCard?.grade ?? 'UNKNOWN';
  const cardGenre = myPhotoCard?.genre ?? '풍경';
  const cardDesc = myPhotoCard?.description ?? '설명이 없습니다.';

  const safePrefDesc = preferredDescription || '교환 희망 설명이 없습니다.';
  const safePrefGrade = preferredGrade || cardGrade;
  const safePrefGenre = preferredGenre || '장르 미정';

  const offers = Array.isArray(receivedQ.data?.items)
    ? receivedQ.data.items
    : receivedQ.data || [];

  const handleUpdate = async payload => {
    await updateMut.mutateAsync(payload);
    setEditOpen(false);
  };
  const handleConfirmCancel = () => {
    if (!listingId) return;
    cancelMut.mutate(undefined, {
      onSuccess: () => {
        (setCancelOpen(false), router.push('/market/my-gallery'));
      },
      onError: err => console.error('판매 내리기 실패:', err),
    });
  };
  const handleAcceptClick = offer => {
    setSelectedOffer(offer);
    setAcceptOpen(true);
  };
  const handleAcceptConfirm = () => {
    if (!selectedOffer?.id) return;
    acceptMut.mutate(selectedOffer.id, {
      onSuccess: () => setAcceptOpen(false),
    });
  };
  const handleRejectClick = offer => {
    setSelectedOffer(offer);
    setRejectOpen(true);
  };
  const handleRejectConfirm = () => {
    if (!selectedOffer?.id) return;
    rejectMut.mutate(selectedOffer.id, {
      onSuccess: () => setRejectOpen(false),
    });
  };
  return (
    <main className="min-h-screen bg-[var(--color-black)] px-[220px] py-[60px] text-white">
      <p className="mb-4 text-[var(--color-gray-300)]">마켓플레이스</p>

      {/* 제목 */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{title} </h1>
      </div>

      <hr className="mb-10 border-[var(--color-gray-400)]" />

      {/* 이미지 + 판매자 카드 */}
      <div className="flex gap-16">
        <div className="flex-1">
          <Image
            src={
              myPhotoCard?.watermarkUrl
                ? myPhotoCard.watermarkUrl
                : myPhotoCard?.imgUrl || '/assets/images/card-img.png'
            }
            alt={title || 'photo'}
            width={960}
            height={720}
            className="h-auto w-full rounded-2xl object-cover"
            priority
            onError={e => {
              e.currentTarget.src = '/assets/images/card-img.png';
            }}
          />
        </div>

        {/* 판매자 카드 */}
        <div className="flex flex-[0.4] justify-end">
          <CardSellerInfo
            userName={sellerName}
            grade={cardGrade}
            genre={cardGenre}
            description={cardDesc}
            price={price}
            quantity={quantity}
            initQuantity={initQuantity}
            status={status}
            preferredGrade={safePrefGrade}
            preferredGenre={safePrefGenre}
            preferredDescription={safePrefDesc}
            onUpdate={() => setEditOpen(true)}
            onDelete={() => setCancelOpen(true)}
          />
        </div>
      </div>

      {/* 받은 교환 제안 */}
      <section className="mt-24">
        <h3 className="mb-4 text-2xl font-bold">받은 교환 제안</h3>
        <hr className="mb-10 border-[var(--color-gray-400)]" />

        {receivedQ.isLoading ? (
          <div className="py-10 text-white/70">불러오는 중...</div>
        ) : offers.length === 0 ? (
          <div className="rounded-xl border border-white/10 p-8 text-white/50">
            아직 받은 제안이 없어요.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {offers.map(offer => (
              <ReceivedExchangeCard
                key={offer.id}
                offer={offer}
                onAccept={() => handleAcceptClick(offer)}
                onReject={() => handleRejectClick(offer)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 수정 모달 */}
      <SellerEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        items={data}
        onUpdate={handleUpdate}
      />

      <SellCancelModal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={handleConfirmCancel}
        loading={cancelMut.isPending}
      />

      {/* 승인하기 모달 */}
      <ExchangeAcceptModal
        open={acceptOpen}
        offer={selectedOffer}
        onConfirm={handleAcceptConfirm}
        onClose={() => setAcceptOpen(false)}
        loading={acceptMut.isPending}
        grade={selectedOffer?.myCard?.grade}
        title={selectedOffer?.myCard?.title}
      />

      <ExchangeRejectModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={handleRejectConfirm}
        loading={rejectMut.isPending}
        grade={selectedOffer?.myCard?.grade}
        title={selectedOffer?.myCard?.title}
      />
    </main>
  );
}
