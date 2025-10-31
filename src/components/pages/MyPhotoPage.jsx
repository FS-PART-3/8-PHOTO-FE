'use client';
import { useState, useMemo } from 'react';
import { useMyGalleryPhotos } from '@/state/useMarketQuery';
import createAuthStore from '@/store/userStore';
import GalleryGrid from '../organisms/GalleryGrid';
import ProductCard from '../organisms/card/ProductCard';
import Pagination from '../molecules/Pagination';
import Title, { TitleBox } from '../molecules/Title';
import Search from '../molecules/Search';
import DropDown from '../molecules/DropDown';
import { GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/productConstants';

// 마이갤러리 페이지 컴포넌트
export default function MyPhotoPage() {
  // 인증 토큰 가져오기
  const { accessToken } = createAuthStore();

  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(0);

  // 검색 및 필터 상태 관리
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState({ label: '', value: '' });
  const [selectedGenre, setSelectedGenre] = useState({ label: '', value: '' });

  // 마이갤러리 데이터 조회
  const { data, isPending, error, isError } = useMyGalleryPhotos(accessToken, {
    page: currentPage,
    size: 12,
  });

  const rawPhotos = data?.data || [];
  const pagination = data?.pagination || {
    page: 0,
    size: 12,
    total: 0,
    totalPages: 0,
  };

  // 검색 및 필터링된 포토카드 목록
  const filteredPhotos = useMemo(() => {
    let result = [...rawPhotos];

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        photo =>
          photo.title?.toLowerCase().includes(query) ||
          photo.description?.toLowerCase().includes(query),
      );
    }

    // 등급 필터링
    if (selectedGrade.value) {
      result = result.filter(photo => photo.grade === selectedGrade.value);
    }

    // 장르 필터링
    if (selectedGenre.value) {
      result = result.filter(photo => photo.genre === selectedGenre.value);
    }

    return result;
  }, [rawPhotos, searchQuery, selectedGrade.value, selectedGenre.value]);

  // 페이지 변경 핸들러
  const handlePageChange = newPage => {
    setCurrentPage(newPage - 1);
  };

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(0); // 검색 시 첫 페이지로 이동
  };

  // 필터 변경 핸들러
  const handleGradeChange = grade => {
    setSelectedGrade(grade);
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
  };

  const handleGenreChange = genre => {
    setSelectedGenre(genre);
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
  };

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

  // 로딩 상태
  if (isPending) {
    return (
      <div className="my-photo-page flex min-h-screen items-center justify-center">
        <div className="text-lg text-white">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="my-photo-page flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">에러가 발생했습니다</p>
          <p className="mt-2 text-sm text-gray-400">
            {error?.message || '데이터를 불러올 수 없습니다.'}
          </p>
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
            label: '포토카드 생성하기',
            href: '/market/my-photo/edit',
          }}
        />

        <section className="mt-4 mb-6 flex items-center gap-4">
          {/* 검색 및 필터 영역 */}
          <div className="max-w-[320px] flex-1">
            <Search
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onSubmit={handleSearch}
              placeholder="포토카드 제목, 설명 검색"
              showSearchIcon={true}
            />
          </div>

          <DropDown
            options={GRADE_OPTIONS}
            value={selectedGrade}
            onChange={handleGradeChange}
            placeholder="등급"
            fontSize="text-sm"
          />

          <DropDown
            options={GENRE_OPTIONS}
            value={selectedGenre}
            onChange={handleGenreChange}
            placeholder="장르"
            fontSize="text-sm"
          />
        </section>
        <section>
          ≈{/* 포토카드 그리드 */}
          {filteredPhotos.length > 0 ? (
            <>
              <GalleryGrid>
                {filteredPhotos.map(card => (
                  <ProductCard
                    key={card.id}
                    type="original"
                    cardId={card.id}
                    title={card.title}
                    grade={card.grade}
                    genre={card.genre}
                    imageUrl={card.imgUrl}
                    price={card.price}
                    quantity={card.quantity}
                    description={card.description}
                  />
                ))}
              </GalleryGrid>

              {/* 페이지네이션 */}
              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.page + 1}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="empty-state flex min-h-[400px] items-center justify-center rounded-lg border border-[var(--color-gray-400)] bg-[var(--color-gray-500)]">
              <p className="text-lg text-gray-400">
                {searchQuery.trim() ||
                selectedGrade.value ||
                selectedGenre.value
                  ? '검색 조건에 맞는 포토카드가 없습니다.'
                  : '등록된 포토카드가 없습니다.'}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
