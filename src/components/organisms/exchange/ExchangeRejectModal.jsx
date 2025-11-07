'use client';

import Modal from '@/components/organisms/modal/Modal';
import Button from '@/components/atoms/Button';

export default function ExchangeRejectModal({
  open,
  onClose,
  onConfirm,
  title,
  grade,
  loading = false,
}) {
  if (!open) return null;
  return (
    <Modal isOpen={open} onClose={onClose}>
      <h3 className="mb-4 text-center text-lg font-bold">교환 제시 거절</h3>

      <p className="mb-8 text-center text-[var(--color-gray-300)]">
        [<span className="font-semibold">{grade}</span>
        <span className="mx-1 text-white/60"> | </span>
        <span className="font-semibold">{title}</span>]
        <span className="ml-1">카드와의 교환을 거절하시겠습니까?</span>
      </p>

      <div className="flex justify-center gap-3">
        <Button
          thikness="thick"
          size="l"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading ? '거절중...' : '거절하기'}
        </Button>
      </div>
    </Modal>
  );
}
