// 공통 상수에서 재사용
export {
  GRADE_OPTIONS,
  GENRE_OPTIONS,
  CREATE_GRADE_OPTIONS,
  CREATE_GENRE_OPTIONS,
  GRADE_DISPLAY_MAP,
  GENRE_VALUE_MAP,
} from './commonConstants';

export const STATUS_MAP = {
  FOR_SALE: '판매 중',
  SOLD_OUT: '품절',
  FOR_EXCHANGE: '교환 제시 대기 중',
  CANCELLED: '취소됨',
};

export const SALE_METHOD_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'FOR_SALE', label: '판매' },
  { value: 'FOR_EXCHANGE', label: '교환' },
];

export const SOLD_OUT_OPTIONS = [
  { value: '', label: '전체' },
  { value: true, label: '품절' },
  { value: false, label: '판매 중' },
];

// 정렬 옵션
export const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '오래된 순', value: 'oldest' },
  { label: '낮은 가격순', value: 'low-price' },
  { label: '높은 가격순', value: 'high-price' },
];

export const MARKET_CARD_TYPE = {
  ORIGINAL: 'original',
  MY_CARD: 'my-card',
  EXCHANGE: 'exchange',
  FOR_SALE: 'for-sale',
};
