'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMarketplaceListings } from '@/state/useMarketQuery';
import useAuth from '@/store/userStore';
import MarketFilters from '../organisms/MarketFilters';
import MarketPhotoList from '../organisms/MarketPhotoList';
import { SORT_OPTIONS } from '@/constants/productConstants';

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

  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);

  // 통합된 쿼리 상태 관리
  const [query, setQuery] = useState(INITIAL_QUERY);

  // 인증 여부
  const isAuthed = !!accessToken;

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

  // 마켓플레이스 데이터 조회
  const { data, isPending, isError } = useMarketplaceListings(
    accessToken,
    query,
  );

  console.log(data);

  // 필터 값 객체 (DropDown 컴포넌트에서 사용)
  const filterValues = {
    grade: query.grade,
    genre: query.genre,
    soldOut: query.soldOut,
    sort: query.sort,
  };

  return (
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
        cards={data?.data}
        isPending={isPending}
        isError={isError}
        isAuthed={isAuthed}
        loginOpen={loginOpen}
        onLoginClose={() => setLoginOpen(false)}
        onLoginConfirm={() => router.push('/auth/login')}
        onCardClick={handleCardClick}
      />
    </div>
  );
}
