'use client';

import Modal from '@/components/organisms/modal/Modal';
import Button from '@/components/atoms/Button';

export default function PurchaseConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  grade,
  count,
  loading = false,
}) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <h3 className="mb-4 text-center text-lg font-bold">포토카드 구매</h3>

      <p className="mb-8 text-center text-[var(--color-gray-300)]">
        [<span className="font-semibold">{grade}</span>
        <span className="mx-1 text-white/60"> | </span>
        <span className="font-semibold">{title}</span>]
        <span className="ml-1"> {count}장을 구매하시겠습니까?</span>
      </p>

      <div className="flex justify-center">
        <Button
          thikness="thick"
          size="l"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading ? '구매중...' : '구매하기'}
        </Button>
      </div>
    </Modal>
  );
}
