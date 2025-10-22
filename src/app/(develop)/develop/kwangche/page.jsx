'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Pagination from '@/components/molecules/Pagination';

// 임시 데이터 생성 함수 (100개의 아이템)
const generateMockData = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `테스트 아이템 ${i + 1}`,
    description: `이것은 ${i + 1}번째 테스트 데이터입니다.`,
  }));
};

// kwangche 개발자 컴포넌트 테스트 페이지
export default function KwangchePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const itemsPerPage = 3; // 페이지당 아이템 수
  const mockData = generateMockData();
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  // 페이지가 변경될 때마다 표시할 데이터 업데이트
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = mockData.slice(startIndex, endIndex);
    setDisplayData(pageData);
  }, [currentPage]);

  const handlePageChange = page => {
    console.log(`페이지 ${page}로 이동`);
    setCurrentPage(page);
  };

  return (
    <div className="developer-page min-h-screen bg-[var(--color-black)]">
      <h2 className="text-[var(--color-white)]">kwangche 개발자 페이지</h2>
      <p className="text-[var(--color-white)]">
        컴포넌트 테스트 및 개발 작업을 위한 페이지입니다.
      </p>
      {/* 개발자가 작업할 컴포넌트들이 여기에 추가될 예정 */}
      <div className="mb-8">
        <h3 className="mb-4 text-xl text-[var(--color-white)]">
          페이지네이션 테스트
        </h3>
        <div className="mb-4 rounded-lg bg-gray-800 p-4">
          <p className="mb-2 text-[var(--color-white)]">
            현재 페이지:{' '}
            <span className="font-bold text-blue-400">{currentPage}</span> /{' '}
            {totalPages}
          </p>
          <p className="text-sm text-gray-400">
            총 {mockData.length}개 아이템 중{' '}
            {(currentPage - 1) * itemsPerPage + 1} ~{' '}
            {Math.min(currentPage * itemsPerPage, mockData.length)}번 표시
          </p>
        </div>

        <div className="mb-8 grid gap-4">
          {displayData.map(item => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-700 bg-gray-800 p-6 transition-colors hover:border-gray-600"
            >
              <h4 className="mb-2 text-lg font-semibold text-[var(--color-white)]">
                {item.title}
              </h4>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div>
        <Button onClick={() => alert('기본버튼')}>기본버튼</Button>
        <Button disabled>비활성화</Button>
        <Button variant="secondary">두번째 스타일</Button>

        <Button thikness="thick" size="l">
          굵기 : thick, 사이즈 : l
        </Button>
        <Button thikness="thick" size="m">
          굵기 : thick, 사이즈 : m
        </Button>

        <Button thikness="thin" size="l">
          굵기 : thin, 사이즈 : l
        </Button>
        <Button thikness="thin" size="m">
          굵기 : thin, 사이즈 : m
        </Button>
        <Button thikness="thin" size="s">
          굵기 : thin, 사이즈 : s
        </Button>
        <Button thikness="thin" size="xs">
          굵기 : thin, 사이즈 : xs
        </Button>
      </div>
    </div>
  );
}
