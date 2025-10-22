'use client';
import { useState } from 'react';
import Image from 'next/image';

////////////////// 페이지네이션 버튼 컴포넌트 //////////////////

function PageArrowButton({ direction, onClick, disabled }) {
  const isPrev = direction === 'prev';
  const label = isPrev ? '이전 페이지' : '다음 페이지';
  const arrow = isPrev
    ? '/assets/icons/ic_left.svg'
    : '/assets/icons/ic_right.svg';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded p-2 transition-all ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
      }`}
      style={{
        color: disabled ? 'var(--color-gray-300)' : 'var(--color-white)',
      }}
      aria-label={label}
    >
      <Image src={arrow} alt={label} width={20} height={20} />
    </button>
  );
}

////////////////// 페이지 번호 컴포넌트 //////////////////

function PageNum({ page, currentPage, onClick }) {
  const isActive = currentPage === page;

  return (
    <button
      onClick={() => onClick(page)}
      className={`min-h-[40px] min-w-[40px] rounded px-3 py-2 text-[14px] text-white transition-all md:min-h-[45px] md:min-w-[45px] lg:min-h-[50px] lg:min-w-[50px] lg:text-base ${
        isActive
          ? 'border-1 border-white font-semibold'
          : 'hover:bg-gray-100 hover:text-gray-500'
      } `}
    >
      {page}
    </button>
  );
}

////////////////// 페이지 드롭다운 컴포넌트 //////////////////

function PageDropdown({ startPage, endPage, currentPage, onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운에 표시할 페이지 목록 생성
  const dropdownPages = [];
  for (let i = startPage; i <= endPage; i++) {
    dropdownPages.push(i);
  }

  const handlePageSelect = page => {
    onClick(page);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group min-h-[40px] min-w-[40px] rounded px-3 py-2 text-[14px] text-white transition-all md:min-h-[45px] md:min-w-[45px] lg:min-h-[50px] lg:min-w-[50px] lg:text-base"
        aria-label="더 많은 페이지 보기"
      >
        ...
        <span className="absolute right-0 bottom-0 h-0 w-0 border-b-[8px] border-l-[8px] border-b-white border-l-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      {isOpen && (
        <>
          {/* 배경 클릭 시 닫기 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 드롭다운 메뉴 */}
          <div className="absolute z-20 mt-2 max-h-60 overflow-y-auto border border-white bg-black shadow-lg">
            <div className="min-w-[100px] py-1">
              {dropdownPages.map(page => (
                <button
                  key={page}
                  onClick={() => handlePageSelect(page)}
                  className={`w-full px-4 py-2 text-left text-white transition-colors hover:bg-gray-100 ${
                    currentPage === page
                      ? 'bg-gray-900 font-semibold'
                      : 'text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

////////////////// 페이지 번호 생성 유틸리티 //////////////////
function generatePageNumbers(currentPage, totalPages, options = {}) {
  const {
    maxVisiblePages = 9, // 전체 표시할 최대 페이지 아이템 수
    edgePageCount = 2, // 양 끝에 고정으로 표시할 페이지 수 (1이면 첫/마지막 페이지만)
    siblingCount = 1, // 현재 페이지 양옆에 표시할 페이지 수
  } = options;

  // 전체 페이지가 표시 가능한 범위 내면 모두 표시
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];

  // 왼쪽 ellipsis를 보여줄지 결정
  const leftEdgeEnd = edgePageCount;
  const leftSiblingStart = Math.max(1, currentPage - siblingCount);
  const showLeftEllipsis = leftSiblingStart > leftEdgeEnd + 1;

  // 오른쪽 ellipsis를 보여줄지 결정
  const rightEdgeStart = totalPages - edgePageCount + 1;
  const rightSiblingEnd = Math.min(totalPages, currentPage + siblingCount);
  const showRightEllipsis = rightSiblingEnd < rightEdgeStart - 1;

  // 왼쪽 고정 페이지들 (첫 페이지부터 edgePageCount개)
  for (let i = 1; i <= leftEdgeEnd; i++) {
    pages.push(i);
  }

  // 왼쪽 ellipsis
  if (showLeftEllipsis) {
    pages.push({
      type: 'ellipsis',
      start: leftEdgeEnd + 1,
      end: leftSiblingStart - 1,
    });
  }

  // 현재 페이지 주변 (왼쪽 고정 영역과 오른쪽 고정 영역 사이)
  const middleStart = Math.max(leftEdgeEnd + 1, leftSiblingStart);
  const middleEnd = Math.min(rightEdgeStart - 1, rightSiblingEnd);

  for (let i = middleStart; i <= middleEnd; i++) {
    pages.push(i);
  }

  // 오른쪽 ellipsis
  if (showRightEllipsis) {
    pages.push({
      type: 'ellipsis',
      start: rightSiblingEnd + 1,
      end: rightEdgeStart - 1,
    });
  }

  // 오른쪽 고정 페이지들 (마지막에서 edgePageCount개)
  for (let i = rightEdgeStart; i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
}

////////////////// 페이지네이션 컴포넌트 //////////////////
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 9, // 전체 표시할 최대 페이지 아이템 수
  edgePageCount = 2, // 양 끝에 고정으로 표시할 페이지 수
  siblingCount = 1, // 현재 페이지 양옆에 표시할 페이지 수
}) {
  const pages = generatePageNumbers(currentPage, totalPages, {
    maxVisiblePages,
    edgePageCount,
    siblingCount,
  });

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = page => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className="my-8 flex items-center justify-center gap-2">
      {/* 이전 페이지 버튼 */}
      <PageArrowButton
        direction="prev"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      />

      {/* 페이지 번호들 */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          // 드롭다운(ellipsis)인 경우
          if (typeof page === 'object' && page.type === 'ellipsis') {
            return (
              <PageDropdown
                key={`ellipsis-${index}`}
                startPage={page.start}
                endPage={page.end}
                currentPage={currentPage}
                onClick={handlePageClick}
              />
            );
          }
          // 숫자 페이지인 경우
          return (
            <PageNum
              key={`page-${page}`}
              page={page}
              currentPage={currentPage}
              onClick={handlePageClick}
            />
          );
        })}
      </div>

      {/* 다음 페이지 버튼 */}
      <PageArrowButton
        direction="next"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
