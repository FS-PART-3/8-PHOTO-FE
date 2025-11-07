'use client';
import { useState } from 'react';
import { useMyGalleryPhotos } from '@/state/useMarketQuery';
import useAuth from '@/store/userStore';
import Pagination from '@/components/molecules/Pagination';
import Title from '@/components/molecules/Title';
import MyCardInfo from '@/components/organisms/MyCardInfo';
import MyPhotoFilters from './MyPhotoFilters';
import MyPhotoList from './MyPhotoList';
import {
  DEFAULT_GALLERY_QUERY,
  INITIAL_PAGE,
  GALLERY_SORT_OPTIONS,
} from '@/constants/galleryConstants';

// 마이갤러리 페이지 컴포넌트
export default function MyPhotoPage() {
  // 인증 토큰 가져오기
  const { accessToken, userName } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // 통합된 쿼리 상태 관리
  const [query, setQuery] = useState(DEFAULT_GALLERY_QUERY);

  // UI 표시용 필터 값
  const [filterDisplay, setFilterDisplay] = useState({
    grade: { label: '', value: '' },
    genre: { label: '', value: '' },
    sort: GALLERY_SORT_OPTIONS[0], // 기본값: 최신순
  });

  // 필터 변경 핸들러
  const handleFilterChange = (filterKey, value) => {
    if (filterKey === 'sort') {
      // 정렬 옵션 변경 시
      setQuery(prev => ({
        ...prev,
        sortBy: value.sortBy,
        sortOrder: value.sortOrder,
        page: INITIAL_PAGE,
      }));
      setFilterDisplay(prev => ({
        ...prev,
        sort: value,
      }));
    } else if (filterKey === 'grade' || filterKey === 'genre') {
      // 등급/장르 필터 변경 시
      setQuery(prev => ({
        ...prev,
        [filterKey]: value.value,
        page: INITIAL_PAGE,
      }));
      setFilterDisplay(prev => ({
        ...prev,
        [filterKey]: value,
      }));
    }
  };

  // 검색 제출 핸들러
  const handleSearchSubmit = value => {
    setQuery(prev => ({
      ...prev,
      search: value,
      page: INITIAL_PAGE,
    }));
  };

  // 페이지 변경 핸들러
  const handlePageChange = newPage => {
    setQuery(prev => ({ ...prev, page: newPage - 1 }));
  };

  // 마이갤러리 데이터 조회
  const { data, isPending, error, isError } = useMyGalleryPhotos(accessToken, {
    page: query.page,
    size: query.size,
    search: query.search,
    grade: query.grade,
    genre: query.genre,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });

  const photos = data?.data || [];
  const pagination = data?.pagination || {
    page: 0,
    size: 12,
    total: 0,
    totalPages: 0,
  };

  // 생성 정보 가져오기
  const creationInfo = data?.creationInfo || {};
  const remainingCount = creationInfo.remainingCreations ?? 0;
  const maxCount = creationInfo.maxCreations ?? 3;
  const isCreationDisabled = remainingCount <= 0;

  // 서버에서 제공하는 현재 년도와 월 사용 (fallback으로 클라이언트 시간 사용)
  const currentYear = creationInfo.currentYear ?? new Date().getFullYear();
  const currentMonth = creationInfo.currentMonth ?? new Date().getMonth() + 1;

  // 인증 체크
  if (!accessToken) {
    return (
      <div className="my-photo-page flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-white">로그인이 필요한 페이지입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-photo-page min-h-screen bg-[var(--color-black)] px-6 py-8">
      <div className="mx-auto mt-[60px] max-w-[1200px] pb-4">
        <Title
          text="마이갤러리"
          action={{
            label: `포토카드 생성하기 (${remainingCount}/${maxCount})`,
            href: isCreationDisabled ? undefined : '/market/my-photo/edit',
            disabled: isCreationDisabled,
            helperText: isCreationDisabled
              ? '이번 달 생성 기회를 모두 사용했습니다.'
              : `${currentYear}년 ${currentMonth}월`,
          }}
        />

        {/* 나의 포토카드 정보 */}
        <MyCardInfo userName={userName} countsGroup={data?.countsGroup} />

        {/* 포토카드 필터 */}
        <MyPhotoFilters
          searchQuery={searchQuery}
          onSearchChange={e => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
          filterValues={{
            grade: filterDisplay.grade,
            genre: filterDisplay.genre,
            sort: filterDisplay.sort,
          }}
          onFilterChange={handleFilterChange}
        />

        {/* 포토카드 목록 */}
        <section>
          <MyPhotoList
            cards={photos}
            isPending={isPending}
            isError={isError}
            error={error}
            searchQuery={query.search}
            hasFilters={query.grade || query.genre}
          />

          {/* 페이지네이션 */}
          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={query.page + 1}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
