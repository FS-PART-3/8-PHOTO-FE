'use client';
import Button from '@/components/atoms/Button';

// kwangche 개발자 컴포넌트 테스트 페이지
export default function KwangchePage() {
  return (
    <div className="developer-page min-h-screen bg-[var(--color-black)]">
      <h2 className="text-[var(--color-white)]">kwangche 개발자 페이지</h2>
      <p className="text-[var(--color-white)]">
        컴포넌트 테스트 및 개발 작업을 위한 페이지입니다.
      </p>
      {/* 개발자가 작업할 컴포넌트들이 여기에 추가될 예정 */}
      <Button onClick={() => alert('기본버튼')}>기본버튼</Button>
      <Button disabled>비활성화</Button>
      <Button variant="secondary">두번째 스타일</Button>

      <Button thikness="thick" size="l">
        굵기 : thick, 사이즈 : l
      </Button>
      <Button thikness="thick" size="m">
        굵기 : thick, 사이즈 : m
      </Button>

      <Button thikness="thin" size="l">
        굵기 : thin, 사이즈 : l
      </Button>
      <Button thikness="thin" size="m">
        굵기 : thin, 사이즈 : m
      </Button>
      <Button thikness="thin" size="s">
        굵기 : thin, 사이즈 : s
      </Button>
      <Button thikness="thin" size="xs">
        굵기 : thin, 사이즈 : xs
      </Button>
    </div>
  );
}
