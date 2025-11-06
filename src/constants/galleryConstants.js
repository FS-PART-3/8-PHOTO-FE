// 마이갤러리 페이지 전용 상수

// 공통 상수 재사용
import { GRADE_OPTIONS, GENRE_OPTIONS } from './commonConstants';

// 페이지네이션 설정
export const INITIAL_PAGE = 0;
export const ITEMS_PER_PAGE = 12;

// 정렬 옵션 (Swagger 스펙에 맞춤)
export const GALLERY_SORT_OPTIONS = [
  {
    label: '최신순',
    value: 'createdAt-desc',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  {
    label: '오래된 순',
    value: 'createdAt-asc',
    sortBy: 'createdAt',
    sortOrder: 'asc',
  },
  {
    label: '제목 (가나다순)',
    value: 'title-asc',
    sortBy: 'title',
    sortOrder: 'asc',
  },
  {
    label: '제목 (역순)',
    value: 'title-desc',
    sortBy: 'title',
    sortOrder: 'desc',
  },
  {
    label: '등급 (높은 순)',
    value: 'grade-desc',
    sortBy: 'grade',
    sortOrder: 'desc',
  },
  {
    label: '등급 (낮은 순)',
    value: 'grade-asc',
    sortBy: 'grade',
    sortOrder: 'asc',
  },
  {
    label: '가격 (높은 순)',
    value: 'price-desc',
    sortBy: 'price',
    sortOrder: 'desc',
  },
  {
    label: '가격 (낮은 순)',
    value: 'price-asc',
    sortBy: 'price',
    sortOrder: 'asc',
  },
];

// 필터 옵션들 (공통 상수 재사용)
export const GALLERY_GRADE_OPTIONS = GRADE_OPTIONS;
export const GALLERY_GENRE_OPTIONS = GENRE_OPTIONS;

// 기본 쿼리 설정
export const DEFAULT_GALLERY_QUERY = {
  page: INITIAL_PAGE,
  size: ITEMS_PER_PAGE,
  search: '',
  grade: '',
  genre: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};
