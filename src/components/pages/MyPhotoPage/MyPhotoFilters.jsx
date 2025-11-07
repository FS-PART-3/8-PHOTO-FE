'use client';

import Search from '@/components/molecules/Search';
import DropDown from '@/components/molecules/DropDown';
import {
  GALLERY_GRADE_OPTIONS,
  GALLERY_GENRE_OPTIONS,
} from '@/constants/galleryConstants';

export default function MyPhotoFilters({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  filterValues,
  onFilterChange,
}) {
  return (
    <section className="mt-4 mb-6 flex items-center gap-4">
      {/* 검색 영역 */}
      <div className="max-w-[320px] flex-1">
        <Search
          value={searchQuery}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          placeholder="포토카드 제목, 설명 검색"
          showSearchIcon={true}
        />
      </div>

      {/* 필터 영역 */}
      <DropDown
        options={GALLERY_GRADE_OPTIONS}
        value={filterValues.grade}
        onChange={value => onFilterChange('grade', value)}
        placeholder="등급"
        fontSize="text-sm"
      />

      <DropDown
        options={GALLERY_GENRE_OPTIONS}
        value={filterValues.genre}
        onChange={value => onFilterChange('genre', value)}
        placeholder="장르"
        fontSize="text-sm"
      />
    </section>
  );
}
