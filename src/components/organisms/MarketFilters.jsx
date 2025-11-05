'use client';

import Search from '../molecules/Search';
import DropDown from '../molecules/DropDown';
import {
  GRADE_OPTIONS,
  GENRE_OPTIONS,
  SOLD_OUT_OPTIONS,
  SORT_OPTIONS,
} from '@/constants/productConstants';

export default function MarketFilters({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  filterValues,
  onFilterChange,
}) {
  return (
    <div className="mx-auto mt-[20px] max-w-[1200px]">
      <div className="flex items-center">
        <Search
          value={searchQuery}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          showSearchIcon={true}
          placeholder="검색어를 입력하세요"
        />

        <div className="ml-[60px]">
          <DropDown
            options={GRADE_OPTIONS}
            placeholder="등급"
            value={filterValues.grade}
            onChange={value => onFilterChange('grade', value.value)}
          />
        </div>

        <div className="ml-[45px]">
          <DropDown
            options={GENRE_OPTIONS}
            placeholder="장르"
            value={filterValues.genre}
            onChange={value => onFilterChange('genre', value.value)}
          />
        </div>

        <div className="ml-[45px]">
          <DropDown
            options={SOLD_OUT_OPTIONS}
            placeholder="매진여부"
            value={filterValues.soldOut}
            onChange={value => onFilterChange('soldOut', value.value)}
          />
        </div>

        <div className="ml-auto">
          <DropDown
            options={SORT_OPTIONS}
            placeholder="정렬 기준"
            value={filterValues.sort}
            onChange={value => onFilterChange('sort', value.value)}
          />
        </div>
      </div>
    </div>
  );
}
