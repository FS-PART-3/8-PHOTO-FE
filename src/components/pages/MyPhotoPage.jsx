'use client';
import { useState } from 'react';
import { useMyGalleryPhotos } from '@/state/useMarketQuery';
import useAuth from '@/store/userStore';
import GalleryGrid from '../organisms/GalleryGrid';
import ProductCard from '../organisms/card/ProductCard';
import Pagination from '../molecules/Pagination';
import Header from '../organisms/header/Header';
import Title from '../molecules/Title';

// 마이갤러리 페이지 컴포넌트
export default function MyPhotoPage() {
  // 인증 토큰 가져오기
  const { accessToken } = useAuth();

  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(0);

  // 마이갤러리 데이터 조회
  const { data, isPending, error, isError } = useMyGalleryPhotos(accessToken, {
    page: currentPage,
    size: 12,
  });

  const photos = data?.data || [];
  const pagination = data?.pagination || {
    page: 0,
    size: 12,
    total: 0,
    totalPages: 0,
  };

  // 페이지 변경 핸들러
  const handlePageChange = newPage => {
    setCurrentPage(newPage - 1);
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
      {/* 결과 정보 */}
      <div className="results-info mb-4">
        <p className="text-sm text-gray-400">
          전체 {pagination.total}개 중 {photos.length}개 표시
        </p>
      </div>

      {/* 포토카드 그리드 */}
      {photos.length > 0 ? (
        <>
          <GalleryGrid>
            {photos.map(card => (
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
          <p className="text-lg text-gray-400">등록된 포토카드가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
