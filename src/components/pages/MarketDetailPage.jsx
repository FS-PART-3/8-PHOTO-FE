'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMarketDetailQuery } from '@/state/useMarketDetailQuery';
import { usePurchaseMutation } from '@/state/usePurchaseMutation';
import CardBuyerInfo from '@/components/organisms/card/CardBuyerInfo';
import Grade from '@/components/molecules/Grade';
import Button from '@/components/atoms/Button';
import PurchaseConfirmModal from '@/components/organisms/purchase/PurchaseConfirmModal';
import { useMyExchangeOffersQuery } from '@/state/useMyExchangeOffersQuery';
import { useCancelExchangeOfferMutation } from '@/state/useCancelExchangeOfferMutation';
import ExchangeProposedCard from '@/components/organisms/exchange/ExchangeProposedCard';
import { useCreateExchangeOfferMutation } from '@/state/useCreateExchangeOfferMutation';
import ExchangeSelectModal from '@/components/organisms/exchange/ExchangeSelectModal';
import ExchangeCancelModal from '@/components/organisms/exchange/ExchangeCancelModal';
import { useMyGalleryPhotos } from '@/state/useMarketQuery';
import useAuth from '@/store/userStore';

export default function MarketDetailPageComponent({ listingId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [buyCount, setBuyCount] = useState(1);
  const [exchangeOpen, setExchangeOpen] = useState(false);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const { data, isLoading, error } = useMarketDetailQuery(listingId);
  const createExchangeMutation = useCreateExchangeOfferMutation(listingId);
  const purchaseMutation = usePurchaseMutation(listingId);
  const cancelMutation = useCancelExchangeOfferMutation(listingId);

  const accessToken = useAuth(s => s.accessToken);

  const myOffersQ = useMyExchangeOffersQuery(listingId);

  // 내가 제시한 교환 목록
  const myOffers = Array.isArray(myOffersQ.data)
    ? myOffersQ.data
    : Array.isArray(myOffersQ.data?.items)
      ? myOffersQ.data.items
      : [];
  const {
    data: myGalleryData,
    isLoading: myGalleryLoading,
    error: myGalleryError,
  } = useMyGalleryPhotos(accessToken, {
    page: 0,
    size: 12,
    search: '',
    grade: '',
    genre: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const galleryItems = Array.isArray(myGalleryData?.items)
    ? myGalleryData.items
    : Array.isArray(myGalleryData?.data)
      ? myGalleryData.data
      : Array.isArray(myGalleryData?.results)
        ? myGalleryData.results
        : Array.isArray(myGalleryData)
          ? myGalleryData
          : [];

  const myGalleryItems = galleryItems.filter(c => Number(c?.quantity ?? 0) > 0);

  const handleConfirmExchange = async ({
    offeredDescription,
    offeredPhotoId,
  }) => {
    try {
      await createExchangeMutation.mutateAsync({
        offeredDescription,
        offeredPhotoId,
      });
      setExchangeOpen(false);
    } catch (e) {
      console.error(e);
      alert(e.message ?? '교환 요청 중 오류가 발생했습니다.');
    }
  };

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
  } = data;

  // 교환 취소 모달 열기
  function openCancelModal(offer) {
    setSelectedOffer(offer);
    setCancelOpen(true);
  }

  function handleConfirmCancel() {
    if (!selectedOffer) return;
    cancelMutation.mutate(selectedOffer.id);
    setCancelOpen(false);
    setSelectedOffer(null);
  }
  // CardBuyerInfo에서 전달한 수량으로 모달 오픈
  const handleBuyClick = count => {
    setBuyCount(count);
    setConfirmOpen(true);
  };

  // 구매
  const handleConfirmPurchase = async () => {
    try {
      await purchaseMutation.mutateAsync({
        quantity: buyCount,
        title: myPhotoCard?.title ?? '',
        grade: myPhotoCard?.grade ?? '',
      });
      setConfirmOpen(false);
    } catch (e) {
      console.error(e);
      alert(e.message ?? '구매 중 오류가 발생했습니다.');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-black)] px-[220px] py-[60px] text-white">
      <p className="mb-4 text-[var(--color-gray-300)]">마켓플레이스</p>

      <h1 className="mb-6 text-4xl font-bold">{myPhotoCard?.title}</h1>

      <hr className="mb-10 border-[var(--color-gray-400)]" />

      <div className="flex gap-16">
        <div className="flex-1">
          <Image
            // src={'/assets/images/card-img.png'} //{myPhotoCard?.imgUrl || '/assets/images/logo.svg'}
            src={
              myPhotoCard?.watermarkUrl
                ? myPhotoCard.watermarkUrl
                : myPhotoCard?.imgUrl || '/assets/images/card-img.png'
            }
            alt={myPhotoCard?.title || 'photo-card'}
            width={960}
            height={720}
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
        {/* 구매 정보 */}
        <div className="flex flex-[0.4] justify-end">
          <CardBuyerInfo
            userName={seller?.name}
            grade={myPhotoCard?.grade}
            genre={myPhotoCard?.genre}
            description={myPhotoCard?.description}
            price={price}
            quantity={quantity}
            initQuantity={initQuantity}
            onBuy={handleBuyClick}
          />
        </div>
      </div>

      {/* 교환 희망 정보 */}
      <div className="mt-20 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">교환 희망 정보</h2>
        <Button thikness="thick" size="l" onClick={() => setExchangeOpen(true)}>
          포토카드 교환하기
        </Button>
      </div>

      <hr className="mb-10 border-[var(--color-gray-400)]" />

      {/* 설명 */}
      <p className="mb-4 text-[var(--color-gray-300)]">
        {preferredDescription || '교환 희망 설명이 없습니다.'}
      </p>

      {/* 등급 | 장르 */}
      <div className="flex items-center gap-3 text-xl text-[var(--color-gray-300)]">
        <Grade grade={preferredGrade} variant="card" size="L" />
        <span className="mx-1 text-white/60">|</span>
        <span>{preferredGenre || '장르 미정'}</span>
      </div>

      {/* 구매 확인 모달 */}
      <PurchaseConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmPurchase}
        title={myPhotoCard?.title}
        grade={myPhotoCard?.grade}
        count={buyCount}
        loading={purchaseMutation.isPending}
      />

      {/* 교환 선택 모달 */}
      <ExchangeSelectModal
        open={exchangeOpen}
        onClose={() => setExchangeOpen(false)}
        items={myGalleryItems}
        onConfirm={handleConfirmExchange}
        loading={createExchangeMutation.isPending || myGalleryLoading}
      />

      {/* ===== 내가 제시한 교환 목록 ===== */}
      <section className="mt-24">
        <h3 className="mb-4 text-2xl font-bold">내가 제시한 교환 목록</h3>
        <hr className="mb-10 border-[var(--color-gray-400)]" />

        {myOffersQ.isLoading ? (
          <div className="py-10 text-white/70">불러오는 중...</div>
        ) : myOffers.length === 0 ? (
          <div className="rounded-xl border border-white/10 p-8 text-white/50">
            아직 제시한 교환이 없어요.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {myOffers.map(offer => (
              <ExchangeProposedCard
                key={offer.id}
                offer={offer}
                onCancel={() => openCancelModal(offer)}
              />
            ))}
          </div>
        )}
      </section>
      {/* 취소 확인 모달 */}
      <ExchangeCancelModal
        open={cancelOpen}
        offer={selectedOffer}
        title={selectedOffer?.myCard?.title}
        grade={selectedOffer?.myCard?.grade}
        loading={cancelMutation.isPending}
        onConfirm={handleConfirmCancel}
        onClose={() => {
          setCancelOpen(false);
          setSelectedOffer(null);
        }}
      />
    </main>
  );
}
