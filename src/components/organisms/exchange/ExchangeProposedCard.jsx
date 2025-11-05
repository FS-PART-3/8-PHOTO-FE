'use client';

import Image from 'next/image';
import Grade from '@/components/molecules/Grade';
import Button from '@/components/atoms/Button';

export default function ExchangeProposedCard({ offer, onCancel }) {
  const card = offer?.myCard ?? {};
  const isPending = offer?.status === 'PENDING';

  // 우측 닉네임 표기 (백엔드에서 안 주면 대체 텍스트)
  const nickname =
    offer?.buyer?.name ??
    offer?.offeredByName ??
    (offer?.offeredById ? `${offer.offeredById.slice(0, 6)}…` : '—');

  const priceVal = offer?.price ?? card?.price ?? null;
  const purchaseText = priceVal != null ? `${priceVal} P 에 구매` : '—';

  return (
    <div className="w-[360px] border border-white/10 bg-[#0F0F0F] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {/* 이미지 */}
      <div className="relative mb-5 aspect-[4/3] overflow-hidden">
        <Image
          src="/assets/images/card-img.png" //{`/${card?.imgUrl || 'assets/images/logo.svg'}`}
          alt={card?.title || '교환 제시 카드'}
          fill
          sizes="360px"
          className="object-cover"
          priority
        />
      </div>

      {/* 제목 */}
      <h4 className="mb-2 text-xl font-extrabold text-white">
        {card?.title ?? '제목 없음'}
      </h4>

      {/* 메타 정보 행 */}
      <div className="mb-3 flex items-center text-xs">
        <Grade grade={card?.grade} variant="chip" size="S" />
        <span className="mx-2 text-white/40">|</span>
        <span className="text-white/60">{card?.genre ?? '장르 미정'}</span>
        <span className="mx-2 text-white/40">|</span>
        <span className="text-white/60">{purchaseText}</span>
        <span className="ml-auto text-white/80">{nickname}</span>
      </div>

      <hr className="mb-4 border-white/10" />

      {/* 제안 메시지 */}
      {offer?.offeredDescription && (
        <p className="mb-6 text-sm leading-6 whitespace-pre-line text-white/80">
          {offer.offeredDescription}
        </p>
      )}

      {/* 하단 버튼 */}
      {isPending ? (
        <button
          type="button"
          onClick={() => onCancel?.(offer.id)}
          disabled={offer.status !== 'PENDING'}
          className="w-full border border-white/30 px-4 py-3 text-base text-white transition hover:bg-white hover:text-black"
        >
          취소하기
        </button>
      ) : (
        <div className="w-full border border-white/10 px-4 py-3 text-center text-base text-white/40">
          취소됨
        </div>
      )}
    </div>
  );
}
