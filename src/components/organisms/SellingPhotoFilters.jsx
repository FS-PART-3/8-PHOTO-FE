'use client';

import Search from '../molecules/Search';
import DropDown from '../molecules/DropDown';
import {
  GRADE_OPTIONS,
  GENRE_OPTIONS,
  SALE_METHOD_OPTIONS,
  SOLD_OUT_OPTIONS,
} from '@/constants/productConstants';

export default function SellingPhotoFilters({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  filterValues,
  onFilterChange,
}) {
  return (
    <div className="mt-[20px] flex items-center gap-[10px]">
      <Search
        value={searchQuery}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        placeholder="상품을 검색하세요"
        showSearchIcon={true}
        className="max-w-[320px]"
      />

      <DropDown
        options={GRADE_OPTIONS}
        placeholder="등급"
        value={filterValues.grade}
        onChange={value => onFilterChange('grade', value.value)}
      />
      <DropDown
        options={GENRE_OPTIONS}
        placeholder="장르"
        value={filterValues.genre}
        onChange={value => onFilterChange('genre', value.value)}
      />
      <DropDown
        options={SALE_METHOD_OPTIONS}
        placeholder="판매 방법"
        value={filterValues.status}
        onChange={value => onFilterChange('status', value.value)}
      />
      <DropDown
        options={SOLD_OUT_OPTIONS}
        placeholder="품절 여부"
        value={filterValues.soldOut}
        onChange={value => onFilterChange('soldOut', value.value)}
      />
    </div>
  );
}
