import { create } from 'zustand';

/**
 * 판매 관련 전역 상태
 */
const useSellStore = create(set => ({
  // 선택된 카드
  selectedCard: null,
  setSelectedCard: card => set({ selectedCard: card }),

  // 모달 상태
  selectModalOpen: false,
  setSelectModalOpen: open => set({ selectModalOpen: open }),

  detailModalOpen: false,
  setDetailModalOpen: open => set({ detailModalOpen: open }),

  resultModalOpen: false,
  setResultModalOpen: open => set({ resultModalOpen: open }),

  // 결과 상태
  sellResult: { success: false, message: '' },
  setSellResult: result => set({ sellResult: result }),

  // 모든 상태 초기화
  reset: () =>
    set({
      selectedCard: null,
      selectModalOpen: false,
      detailModalOpen: false,
      resultModalOpen: false,
      sellResult: { success: false, message: '' },
    }),
}));

export default useSellStore;
