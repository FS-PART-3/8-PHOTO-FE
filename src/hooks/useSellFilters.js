import { useState } from 'react';

/**
 * 판매 모달 검색/필터 로직 커스텀 훅
 */
export function useSellFilters(items = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState({ label: '', value: '' });
  const [selectedGenre, setSelectedGenre] = useState({ label: '', value: '' });

  // 필터링된 아이템
  let filteredItems = [...items];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filteredItems = filteredItems.filter(
      p =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q),
    );
  }
  if (selectedGrade.value) {
    filteredItems = filteredItems.filter(p => p.grade === selectedGrade.value);
  }
  if (selectedGenre.value) {
    filteredItems = filteredItems.filter(p => p.genre === selectedGenre.value);
  }

  // 필터 초기화
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGrade({ label: '', value: '' });
    setSelectedGenre({ label: '', value: '' });
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedGrade,
    setSelectedGrade,
    selectedGenre,
    setSelectedGenre,
    filteredItems,
    resetFilters,
  };
}
