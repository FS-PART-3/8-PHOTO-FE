'use client';

import Modal from '@/components/organisms/modal/Modal';
import Button from '@/components/atoms/Button';

export default function ExchangeAcceptModal({
  open,
  onClose,
  onConfirm,
  title,
  grade,
  loading = false,
}) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <h3 className="mb-4 text-center text-lg font-bold">교환 제시 승인</h3>

      <p className="mb-8 text-center text-[var(--color-gray-300)]">
        [<span className="font-semibold">{grade}</span>
        <span className="mx-1 text-white/60"> | </span>
        <span className="font-semibold">{title}</span>]
        <span className="ml-1">카드와의 교환을 승인하시겠습니까?</span>
      </p>

      <div className="flex justify-center">
        <Button
          thikness="thick"
          size="l"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading ? '승인중...' : '승인하기'}
        </Button>
      </div>
    </Modal>
  );
}
