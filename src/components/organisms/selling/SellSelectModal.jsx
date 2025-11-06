'use client';

import { useEffect } from 'react';
import ModalResponsive from '@/components/organisms/modal/ModalResponsive';
import Search from '@/components/molecules/Search';
import DropDown from '@/components/molecules/DropDown';
import { GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/productConstants';
import SellSelectableCard from '@/components/organisms/selling/SellSelectableCard';
import SellDetailModal from '@/components/organisms/selling/SellDetailModal';
import { useSellFilters } from '@/hooks/useSellFilters';
import { useSellModal } from '@/hooks/useSellModal';
import Title from '@/components/molecules/Title';
import useAuth from '@/store/userStore';

/**
 * 판매 포토카드 선택 모달
 */
export default function SellSelectModal({
  open,
  onClose,
  items = [],
  onConfirm,
}) {
  const { userName } = useAuth();
  // 커스텀 훅 사용
  const {
    searchQuery,
    setSearchQuery,
    selectedGrade,
    setSelectedGrade,
    selectedGenre,
    setSelectedGenre,
    filteredItems,
    resetFilters,
  } = useSellFilters(items);

  const {
    selectedCardId,
    detailModalOpen,
    handleSelectCard,
    handleCloseDetail,
    resetSelection,
  } = useSellModal();

  // 모달 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      resetFilters();
      resetSelection();
    }
  }, [open]);

  // 선택된 카드
  const selectedCard = items.find(p => p.id === selectedCardId);

  // 판매 확인 핸들러
  const handleDetailConfirm = data => {
    if (!selectedCardId) return;
    onConfirm?.({ photoId: selectedCardId, ...data });
    handleCloseDetail();
    onClose?.();
  };

  return (
    <>
      <ModalResponsive isOpen={open} onClose={onClose}>
        {/* 헤더 */}
        <div className="px-6 pt-6">
          <p className="beskin-h6 mt-10 mb-8 text-sm text-white/60">
            마이갤러리
          </p>

          <Title size="46" text="나의 포토카드 판매하기" dividerOffset={0} />

          {/* 검색/필터 바 */}
          <div className="mt-4 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 sm:max-w-[320px]">
              <Search
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onSubmit={() => {}}
                placeholder="검색"
                showSearchIcon
              />
            </div>

            <DropDown
              options={GRADE_OPTIONS}
              value={selectedGrade}
              onChange={setSelectedGrade}
              placeholder="등급"
              fontSize="text-sm"
            />
            <DropDown
              options={GENRE_OPTIONS}
              value={selectedGenre}
              onChange={setSelectedGenre}
              placeholder="장르"
              fontSize="text-sm"
            />
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className="px-6 pb-6">
          {filteredItems.length > 0 ? (
            <div className="mx-auto grid min-h-[300px] w-full grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredItems.map(card => (
                <SellSelectableCard
                  key={card.id}
                  type="my-card"
                  cardId={card.id}
                  title={card.title}
                  grade={card.grade}
                  genre={card.genre}
                  imageUrl={card.imgUrl}
                  status={card.status}
                  price={card.price}
                  quantity={card.quantity}
                  initQuantity={card.initQuantity}
                  userName={userName}
                  onClick={() => handleSelectCard(card.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60">
              {searchQuery.trim() || selectedGrade.value || selectedGenre.value
                ? '검색/필터 조건에 맞는 포토카드가 없습니다.'
                : '판매 가능한 포토카드가 없습니다.'}
            </div>
          )}
        </div>
      </ModalResponsive>
      <SellDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetail}
        card={selectedCard}
        onConfirm={handleDetailConfirm}
        userName={userName}
      />
    </>
  );
}
