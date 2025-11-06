'use client';

import ModalResponsive from '@/components/organisms/modal/ModalResponsive';

/**
 * 판매 등록 결과 모달
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {boolean} success - 성공 여부
 * @param {string} message - 표시할 메시지
 */
export default function SellResultModal({ open, onClose, success, message }) {
  return (
    <ModalResponsive isOpen={open} onClose={onClose}>
      <div className="px-6 pt-6 pb-8">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          {/* 아이콘 */}
          <div
            className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
              success ? 'bg-[var(--color-main)]' : 'bg-red-500'
            }`}
          >
            {success ? (
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-black)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>

          {/* 제목 */}
          <h2 className="mb-3 text-2xl font-bold text-white">
            {success ? '판매 등록 성공' : '판매 등록 실패'}
          </h2>

          {/* 메시지 */}
          <p className="text-white/70">
            {message ||
              (success
                ? '포토카드가 성공적으로 등록되었습니다.'
                : '포토카드 등록에 실패했습니다.')}
          </p>

          {/* 확인 버튼 */}
          <button
            onClick={onClose}
            className="mt-8 h-[48px] w-full max-w-[200px] rounded-[2px] bg-[var(--color-main)] text-base font-bold text-[var(--color-black)] hover:opacity-90"
          >
            확인
          </button>
        </div>
      </div>
    </ModalResponsive>
  );
}
