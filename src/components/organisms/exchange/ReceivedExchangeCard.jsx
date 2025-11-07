'use client';

import Image from 'next/image';
import Grade from '@/components/molecules/Grade';
import Button from '@/components/atoms/Button';

export default function ReceivedExchangeCard({ offer, onAccept, onReject }) {
  if (!offer) return null;

  const isPending = offer.status === 'PENDING';

  // 상대가 제시한 카드
  const card = offer?.myCard ?? {};
  const nickname = offer?.buyer?.name ?? '—';

  return (
    <div className="w-[360px] border border-white/10 bg-[#0F0F0F] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {/* 이미지 */}
      <div className="relative mb-5 aspect-[4/3] overflow-hidden">
        <Image
          src="/assets/images/card-img.png" //{card?.imgUrl || '/assets/images/card-img.png'}
          alt={card?.title || '교환 제안 카드'}
          fill
          sizes="360px"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* 제목 */}
      <h4 className="mb-2 text-xl font-extrabold text-white">
        {card?.title ?? '제목 없음'}
      </h4>

      {/* 메타 정보 */}
      <div className="mb-3 flex items-center text-xs">
        <Grade grade={card?.grade} variant="chip" size="S" />
        <span className="mx-2 text-white/40">|</span>
        <span className="text-white/60">{card?.genre ?? '장르 미정'}</span>
        <span className="ml-auto text-white/80">{nickname}</span>
      </div>

      <hr className="mb-4 border-white/10" />

      {/* 제안 메시지 */}
      {offer?.offeredDescription && (
        <p className="mb-6 text-sm leading-6 whitespace-pre-line text-white/80">
          {offer.offeredDescription}
        </p>
      )}

      {/* 버튼 */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="s"
          thikness="thin"
          onClick={() => onAccept?.(offer.id)}
          disabled={!isPending}
        >
          승인하기
        </Button>
        <Button
          size="s"
          thikness="thin"
          variant="secondary"
          onClick={() => onReject?.(offer.id)}
          disabled={!isPending}
        >
          거절하기
        </Button>
      </div>
    </div>
  );
}
