'use client';

import { useEffect } from 'react';

export default function ModalResponsive({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#000000CC] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-[960px] overflow-hidden rounded-[2px] bg-[#161616]">
        {/* 닫기 버튼 */}
        <button
          aria-label="닫기"
          onClick={onClose}
          className="absolute top-[30px] right-[30px] grid h-8 w-8 cursor-pointer place-items-center text-[#A4A4A4] hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="max-h-[80dvh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
