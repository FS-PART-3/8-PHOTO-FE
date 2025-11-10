'use client';

import Modal from '@/components/organisms/modal/Modal';
import Button from '@/components/atoms/Button';

export default function SellCancelModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <h3 className="mb-4 text-center text-lg font-bold">
        포토카드 판매 내리기
      </h3>

      <p className="mb-8 text-center text-[var(--color-gray-300)]">
        <span className="font-semibold">정말로 판매를 중단하시겠습니까?</span>
      </p>

      <div className="flex justify-center">
        <Button
          thikness="thick"
          size="l"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading ? '판매 내리는중..' : '판매내리기'}
        </Button>
      </div>
    </Modal>
  );
}
