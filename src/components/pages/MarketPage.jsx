'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMarketplaceListings } from '@/state/useMarketQuery';
import useAuth from '@/store/userStore';
import MarketFilters from '../organisms/MarketFilters';
import MarketPhotoList from '../organisms/MarketPhotoList';
import { SORT_OPTIONS } from '@/constants/productConstants';
import InfinityScrollBar from '../molecules/InfinityScrollBar';
import Title from '../molecules/Title';
import SellSelectModal from '../organisms/selling/SellSelectModal';
import SellResultModal from '../organisms/selling/SellResultModal';
import { useMyGallery } from '@/state/useMyGalleryQuery';
import { useCreateListingMutation } from '@/state/useCreateListingMutation';
import useSellStore from '@/store/sellStore';

const INITIAL_QUERY = {
  search: '',
  grade: '',
  genre: '',
  soldOut: '',
  sort: SORT_OPTIONS[0].value,
};

export default function MarketPage() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const observerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);

  // 판매 전역 상태 (zustand)
  const {
    selectModalOpen,
    setSelectModalOpen,
    resultModalOpen,
    setResultModalOpen,
    sellResult,
    setSellResult,
  } = useSellStore();

  // 통합된 쿼리 상태 관리
  const [query, setQuery] = useState(INITIAL_QUERY);

  // 인증 여부
  const isAuthed = !!accessToken;

  // 마이갤러리 데이터 조회 (판매용)
  const { data: galleryData } = useMyGallery(accessToken, {});
  const myGalleryCards = galleryData?.data ?? [];

  // 판매 등록 Mutation
  const createListingMutation = useCreateListingMutation();

  // 필터 변경 핸들러
  const handleFilterChange = (filterKey, value) => {
    setQuery(prev => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  // 검색 제출 핸들러
  const handleSearchSubmit = () => {
    handleFilterChange('search', searchQuery);
  };

  // 카드 클릭 핸들러
  const handleCardClick = card => {
    if (!isAuthed) {
      setLoginOpen(true);
      return;
    }
    router.push(`/market/${card.id}`);
  };

  // 판매하기 버튼 클릭 핸들러
  const handleSellClick = () => {
    if (!isAuthed) {
      setLoginOpen(true);
      return;
    }
    setSelectModalOpen(true);
  };

  // 판매 등록 확인 핸들러
  const handleSellConfirm = async data => {
    try {
      await createListingMutation.mutateAsync(data);
      setSellResult({
        success: true,
        message: '포토카드가 성공적으로 등록되었습니다.',
      });
      setResultModalOpen(true);
    } catch (error) {
      setSellResult({
        success: false,
        message: error.message || '포토카드 등록에 실패했습니다.',
      });
      setResultModalOpen(true);
    }
  };

  // 결과 모달 닫기 핸들러
  const handleResultModalClose = () => {
    setResultModalOpen(false);
    if (sellResult.success) {
      // 성공 시 페이지 새로고침 또는 쿼리 재조회
      router.refresh();
    }
  };

  // 마켓플레이스 데이터 조회
  const {
    data: marketplaceData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMarketplaceListings(accessToken, query);

  const allCards =
    marketplaceData?.pages
      ?.flatMap(page => page.data)
      ?.filter(card => card.status !== 'CANCELLED') ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // 관찰 대상이 화면에 보이고, 다음 페이지가 있으며, 현재 로딩 중이 아닐 때
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    const currentTarget = observerRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 필터 값 객체 (DropDown 컴포넌트에서 사용)
  const filterValues = {
    grade: query.grade,
    genre: query.genre,
    soldOut: query.soldOut,
    sort: query.sort,
  };

  return (
    <>
      <div className="mx-auto mt-[60px] max-w-[1200px]">
        <Title
          text="마켓플레이스"
          size="48"
          family="secondary"
          weight={400}
          containerWidth="full"
          justify="between"
          align="center"
          action={{
            label: '나의 포토카드 판매하기',
            size: 'auto',
            variant: 'primary',
            disabled: false,
            onClick: handleSellClick,
          }}
        />
      </div>
      <div className="market-page">
        {/* 마켓 필터 */}
        <MarketFilters
          searchQuery={searchQuery}
          onSearchChange={e => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
        />

        {/* 마켓 포토카드 목록 */}
        <MarketPhotoList
          cards={allCards}
          isPending={isPending}
          isError={isError}
          isAuthed={isAuthed}
          loginOpen={loginOpen}
          onLoginClose={() => setLoginOpen(false)}
          onLoginConfirm={() => router.push('/auth/login')}
          onCardClick={handleCardClick}
        />

        {/* 무한 스크롤 트리거 영역 */}
        <InfinityScrollBar
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          observerRef={observerRef}
        />
      </div>

      {/* 판매 선택 모달 */}
      <SellSelectModal
        open={selectModalOpen}
        onClose={() => setSelectModalOpen(false)}
        items={myGalleryCards}
        onConfirm={handleSellConfirm}
      />

      {/* 판매 결과 모달 */}
      <SellResultModal
        open={resultModalOpen}
        onClose={handleResultModalClose}
        success={sellResult.success}
        message={sellResult.message}
      />
    </>
  );
}
