'use client';

import { useState, useEffect } from 'react';
import Title from '../molecules/Title';
import { useMySellingPhotos } from '@/state/useSellingQuery';
import Pagination from '../molecules/Pagination';
import MyCardInfo from '../organisms/MyCardInfo';
import SellingPhotoFilters from '../organisms/SellingPhotoFilters';
import SellingPhotoList from '../organisms/SellingPhotoList';
import useAuth from '@/store/userStore';

const INITIAL_PAGE = 1;
const ITEMS_PER_PAGE = 12;

// 나의 판매 포토카드 페이지 컴포넌트
export default function MySellingPage() {
  const { accessToken, useName } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // 통합된 쿼리 상태 관리
  const [query, setQuery] = useState({
    page: INITIAL_PAGE,
    limit: ITEMS_PER_PAGE,
    search: '',
    grade: '',
    genre: '',
    status: '',
  });

  // 필터 변경 핸들러
  const handleFilterChange = (filterKey, value) => {
    setQuery(prev => ({
      ...prev,
      [filterKey]: value,
      page: INITIAL_PAGE,
    }));
  };

  // 페이지 변경 핸들러
  const handlePageChange = newPage => {
    setQuery(prev => ({ ...prev, page: newPage }));
  };

  const { data, isPending, error, isError } = useMySellingPhotos(
    accessToken,
    query,
  );

  return (
    <div className="mx-auto mt-[60px] w-full max-w-[1200px]">
      <Title text="나의 판매 포토카드" />

      {/* 나의 포토카드 정보 */}
      <MyCardInfo userName={useName} countsGroup={data?.countsGroup} />

      {/* 판매 포토카드 필터 */}
      <SellingPhotoFilters
        searchQuery={searchQuery}
        onSearchChange={e => setSearchQuery(e.target.value)}
        onSearchSubmit={value => handleFilterChange('search', value)}
        filterValues={{
          grade: query.grade,
          genre: query.genre,
          status: query.status,
        }}
        onFilterChange={handleFilterChange}
      />

      {/* 판매 포토카드 목록 */}
      <SellingPhotoList
        cards={data?.cards}
        isPending={isPending}
        isError={isError}
      />

      {/* 페이지네이션 */}
      <div>
        <Pagination
          currentPage={query.page}
          maxVisiblePages={ITEMS_PER_PAGE}
          totalPages={Math.ceil(
            data?.countsGroup?.totalCounts / ITEMS_PER_PAGE,
          )}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
