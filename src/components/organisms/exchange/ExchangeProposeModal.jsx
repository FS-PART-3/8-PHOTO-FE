'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ModalResponsive from '@/components/organisms/modal/ModalResponsive';
import Grade from '@/components/molecules/Grade';

export default function ExchangeProposeModal({
  open,
  onClose,
  card,
  onConfirm,
  loading = false,
}) {
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!open) setDesc('');
  }, [open]);

  if (!card) return null;

  return (
    <ModalResponsive isOpen={open} onClose={onClose}>
      <div className="px-6 pt-6">
        <p className="beskin-h6 text-white/60">포토카드 교환하기</p>
        <h2 className="beskin-h3 mt-2 text-white">{card.title}</h2>
        <hr className="mt-4 border-white/10" />
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 카드 미리보기 */}
          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={
                  card?.watermarkUrl
                    ? card.watermarkUrl
                    : card?.imgUrl || '/assets/images/card-img.png'
                }
                alt={card.title}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
                onError={e => {
                  e.currentTarget.src = '/assets/images/card-img.png';
                }}
              />
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Grade grade={card.grade} variant="card" size="L" />
                  <span className="text-white/50">|</span>
                  <span>{card.genre}</span>
                </div>
                {card.author && (
                  <span className="underline decoration-white/30 underline-offset-2">
                    {card.author}
                  </span>
                )}
              </div>
              <hr className="my-4 border-white/10" />
              <div className="space-y-2 text-sm text-white/80">
                <p className="flex items-center justify-between">
                  <span className="text-white/60">가격</span>
                  <span className="font-semibold">{card.price} P</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-white/60">수량</span>
                  <span className="font-semibold">{card.quantity}</span>
                </p>
              </div>
              <div className="mt-6 text-center font-extrabold tracking-tight">
                <span className="beskin-h6">최애의포토</span>
              </div>
            </div>
          </div>

          {/* 교환 제시 내용 */}
          <div>
            <p className="text-[var(--color-white)]">교환 제시 내용</p>
            <textarea
              className="mt-3 h-[160px] w-full resize-none rounded-md border border-white/20 bg-transparent p-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/20 focus:outline-none"
              placeholder="내용을 입력해 주세요"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-[48px] min-w-[140px] rounded-[2px] border border-white/20 bg-[#0f0f0f] px-5 text-sm font-semibold text-white hover:bg-white/5"
              >
                취소하기
              </button>
              <button
                type="button"
                onClick={() =>
                  onConfirm?.({
                    offeredDescription: desc.trim(),
                    offeredPhotoId: card.id,
                  })
                }
                disabled={!desc.trim() || loading}
                className="h-[48px] min-w-[160px] rounded-[2px] bg-[var(--color-main)] px-6 text-base font-bold text-[var(--color-black)] disabled:opacity-50"
              >
                교환하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalResponsive>
  );
}
