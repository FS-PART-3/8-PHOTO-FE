'use client';

import Modal from '@/components/organisms/modal/Modal';
import Button from '@/components/atoms/Button';

export default function ExchangeCancelModal({
  open,
  onClose,
  onConfirm,
  title,
  grade,
  loading = false,
}) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <h3 className="mb-4 text-center text-lg font-bold">교환 제시 취소</h3>

      <p className="mb-8 text-center text-[var(--color-gray-300)]">
        [<span className="font-semibold">{grade}</span>
        <span className="mx-1 text-white/60"> | </span>
        <span className="font-semibold">{title}</span>] 교환 제시를
        취소하시겠습니까?
      </p>

      <div className="flex justify-center">
        <Button
          thikness="thick"
          size="l"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading ? '처리중...' : '취소하기'}
        </Button>
      </div>
    </Modal>
  );
}
