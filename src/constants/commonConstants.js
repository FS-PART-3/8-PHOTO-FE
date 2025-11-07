// 공통으로 사용되는 상수들

// 등급(Grade) 기본 옵션들
const GRADE_BASE_OPTIONS = [
  { value: 'COMMON', label: 'COMMON' },
  { value: 'RARE', label: 'RARE' },
  { value: 'SUPER_RARE', label: 'SUPER RARE' },
  { value: 'LEGENDARY', label: 'LEGENDARY' },
];

// 장르(Genre) 기본 옵션들
const GENRE_BASE_OPTIONS = [
  { value: '풍경', label: '풍경' },
  { value: '인물', label: '인물' },
  { value: '도시', label: '도시' },
  { value: '자연', label: '자연' },
];

// 필터용 등급 옵션 (전체 포함)
export const GRADE_OPTIONS = [
  { value: '', label: '전체' },
  ...GRADE_BASE_OPTIONS,
];

// 필터용 장르 옵션 (전체 포함)
export const GENRE_OPTIONS = [
  { value: '', label: '전체' },
  ...GENRE_BASE_OPTIONS,
];

// 생성용 등급 옵션 (전체 제외)
export const CREATE_GRADE_OPTIONS = GRADE_BASE_OPTIONS;

// 생성용 장르 옵션 (전체 제외)
export const CREATE_GENRE_OPTIONS = GENRE_BASE_OPTIONS;

// 등급 표시 맵
export const GRADE_DISPLAY_MAP = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  SUPER_RARE: 'SUPER RARE',
  LEGENDARY: 'LEGENDARY',
};

// 장르 매핑 (한글 -> 영문)
export const GENRE_VALUE_MAP = {
  풍경: 'landscape',
  인물: 'portrait',
  도시: 'city',
  자연: 'nature',
};
