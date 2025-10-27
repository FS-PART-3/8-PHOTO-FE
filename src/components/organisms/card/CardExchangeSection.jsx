'use client';

import Button from '@/components/atoms/Button';

/**
 * 카드 교환 섹션 컴포넌트
 * @param description - 교환 설명
 * @param onReject - 거절 버튼 클릭 핸들러
 * @param onApprove - 승인 버튼 클릭 핸들러
 */
export default function CardExchangeSection({
  description,
  onReject,
  onApprove,
}) {
  return (
    <div className="mt-2 border-t border-gray-400 pt-4">
      <div className="text-white">{description}</div>
      <div className="mt-4 flex items-center justify-between gap-5">
        <Button variant="secondary" thikness="thin" size="s" onClick={onReject}>
          거절하기
        </Button>
        <Button variant="primary" thikness="thin" size="s" onClick={onApprove}>
          승인하기
        </Button>
      </div>
    </div>
  );
}
