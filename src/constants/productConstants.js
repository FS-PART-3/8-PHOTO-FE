export const STATUS_MAP = {
  FOR_SALE: '판매 중',
  SOLD_OUT: '품절',
  FOR_EXCHANGE: '교환 제시 대기 중',
  CANCELLED: '취소됨',
};

export const GRADE_DISPLAY_MAP = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  SUPER_RARE: 'SUPER RARE',
  LEGENDARY: 'LEGENDARY',
};

// 필터 옵션들
export const GRADE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'COMMON', label: 'COMMON' },
  { value: 'RARE', label: 'RARE' },
  { value: 'SUPER_RARE', label: 'SUPER RARE' },
  { value: 'LEGENDARY', label: 'LEGENDARY' },
];

export const GENRE_OPTIONS = [
  { value: '', label: '전체' },
  { value: '풍경', label: '풍경' },
  { value: '인물', label: '인물' },
  { value: '도시', label: '도시' },
  { value: '자연', label: '자연' },
];

export const SALE_METHOD_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'FOR_SALE', label: '판매' },
  { value: 'FOR_EXCHANGE', label: '교환' },
];

export const SOLD_OUT_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'true', label: '품절' },
  { value: 'false', label: '판매 중' },
// 포토카드 생성용 옵션 (전체 제외)
export const CREATE_GRADE_OPTIONS = [
  { value: 'COMMON', label: 'COMMON' },
  { value: 'RARE', label: 'RARE' },
  { value: 'SUPER_RARE', label: 'SUPER RARE' },
  { value: 'LEGENDARY', label: 'LEGENDARY' },
];

export const CREATE_GENRE_OPTIONS = [
  { value: '풍경', label: '풍경' },
  { value: '인물', label: '인물' },
  { value: '도시', label: '도시' },
  { value: '자연', label: '자연' },
];
