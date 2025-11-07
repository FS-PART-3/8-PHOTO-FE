'use client';
import { useEffect, useRef } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title = '',
  description = '',
  confirmText = '확인',
  onConfirm,
  cancelText,
  onCancel,
  width = 'md',
  children,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthTemplate = {
    md: 'w-[560px]',
    lg: 'w-[704px]',
    xl: 'w-[1034px]',
  };

  const widthClass = widthTemplate[width];

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#000000CC]"
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        className={`relative ${widthClass} overflow-hidden rounded-[2px] bg-[#161616]`}
      >
        <button
          aria-label="닫기"
          onClick={onClose}
          className="absolute top-[30px] right-[30px] grid h-8 w-8 place-items-center text-[#A4A4A4] hover:text-white"
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

        <div className="px-[48px] pt-[80px] pb-[40px] text-center">
          {children ? (
            children
          ) : (
            <>
              {title && (
                <h2
                  className="text-[20px] font-bold text-white"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  className="mt-[12px] text-[16px] leading-[1.6] font-normal whitespace-pre-line text-[#A4A4A4]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {description}
                </p>
              )}
            </>
          )}

          {(onConfirm || onCancel) && (
            <div className="mt-[36px] flex items-center justify-center gap-3">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="h-[60px] min-w-[140px] rounded-[2px] border border-[var(--color-gray-100)] bg-[var(--color-black)] px-6 text-[16px] font-semibold text-white"
                >
                  {cancelText ?? '취소'}
                </button>
              )}
              {onConfirm && (
                <button
                  type="button"
                  onClick={onConfirm}
                  className="h-[60px] min-w-[170px] rounded-[2px] bg-[var(--color-main)] px-6 text-[18px] font-bold text-[var(--color-black)]"
                >
                  {confirmText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
