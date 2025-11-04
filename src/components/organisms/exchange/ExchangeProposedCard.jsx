'use client';

import Image from 'next/image';
import Grade from '@/components/molecules/Grade';
import Button from '@/components/atoms/Button';

export default function ExchangeProposedCard({ offer, onCancel }) {
  const card = offer?.myCard ?? {};
  const isPending = offer?.status === 'PENDING';

  return (
    <div className="w-[360px] rounded-2xl border border-white/10 bg-[#121212] p-4">
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={card?.imgUrl || '/assets/images/logo.svg'}
          alt={card?.title || '교환 제시 카드'}
          fill
          sizes="360px"
          className="object-cover"
        />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <Grade grade={card?.grade} variant="chip" size="S" />
        <span className="text-xs text-white/60">|</span>
        <span className="text-xs text-white/60">
          {card?.genre ?? '장르 미정'}
        </span>
        <div className="ml-auto text-xs text-white/40">{offer?.status}</div>
      </div>

      <p className="mb-1 text-sm text-white/80">{card?.title ?? '제목 없음'}</p>
      {offer?.offeredDescription && (
        <p className="mb-4 line-clamp-2 text-xs text-white/50">
          {offer.offeredDescription}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-white/50">
          보유 {Number(card?.quantity ?? 0)}장
        </div>

        {isPending ? (
          <Button size="s" thikness="thin" onClick={() => onCancel?.(offer.id)}>
            취소하기
          </Button>
        ) : (
          <div className="text-xs text-white/40">취소 불가</div>
        )}
      </div>
    </div>
  );
}
