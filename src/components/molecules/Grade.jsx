'use client';

export default function Grade({
  grade,
  variant = 'card', // 'card' | 'detail' | 'my_card'
  size = 'M', // L | M | S (대문자)
  showLabel = true,
  className = '',
}) {
  const meta = normalizeGrade(grade); // { key, label, colorVar }

  // 각 variant별 폰트 크기 정의 (px)
  const fontSizes = {
    my_card: { L: 16, M: 14, S: 12 },
    card: { L: 16, S: 10 },
    detail: { L: 24, S: 18 },
  };

  const currentSize = fontSizes[variant]?.[size] ?? 14; // 기본값 14px
  const isMyCard = variant === 'my_card';
  const weightClass = variant === 'detail' ? 'font-bold' : 'font-semibold';

  // 공통 텍스트 스타일
  const commonStyle = {
    color: `var(${meta.colorVar})`,
    fontSize: `${currentSize}px`,
    fontFamily: 'var(--font-primary)',
  };

  // my_card: 검은 배경 + 직선 테두리
  const myCardClass =
    'inline-flex items-center px-2 py-0.5 border border-solid';
  const myCardStyle = {
    borderColor: `var(${meta.colorVar})`,
    color: `var(${meta.colorVar})`,
    backgroundColor: 'var(--color-black)',
  };

  return (
    <span
      className={[weightClass, isMyCard ? myCardClass : '', className].join(
        ' ',
      )}
      style={isMyCard ? { ...commonStyle, ...myCardStyle } : commonStyle}
      title={`등급 ${meta.label}`}
    >
      {showLabel ? meta.label : meta.key}
    </span>
  );
}

function normalizeGrade(input) {
  if (!input) return unknownMeta();

  const prepared = String(input)
    .trim()
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .toUpperCase();

  const allowed = ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'];
  const key = allowed.includes(prepared) ? prepared : null;
  if (!key) return unknownMeta();

  const paletteVar = {
    COMMON: '--color-main',
    RARE: '--color-blue',
    'SUPER RARE': '--color-purple',
    LEGENDARY: '--color-pink',
  }[key];

  return { key, label: key, colorVar: paletteVar };
}

function unknownMeta() {
  return { key: 'UNKNOWN', label: 'UNKNOWN', colorVar: '--color-gray-300' };
}
