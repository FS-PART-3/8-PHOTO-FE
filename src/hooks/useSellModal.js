import { useState } from 'react';

/**
 * 판매 모달 상태 관리 커스텀 훅
 */
export function useSellModal() {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // 카드 선택 핸들러
  const handleSelectCard = cardId => {
    setSelectedCardId(cardId);
    setDetailModalOpen(true);
  };

  // 상세 모달 닫기
  const handleCloseDetail = () => {
    setDetailModalOpen(false);
  };

  // 선택 초기화
  const resetSelection = () => {
    setSelectedCardId(null);
    setDetailModalOpen(false);
  };

  return {
    selectedCardId,
    detailModalOpen,
    handleSelectCard,
    handleCloseDetail,
    resetSelection,
  };
}
