'use client';

import Image from 'next/image';
import Grade from '@/components/molecules/Grade';

/**
 * 교환용 포토카드 단일 카드 컴포넌트
 *
 * @param {Object} props
 * @param {Object} props.data - 카드 데이터 (title, imgUrl, grade, genre, author, price, quantity 등)
 * @param {boolean} props.selected - 선택 상태
 * @param {() => void} props.onSelect - 클릭 시 실행되는 선택 핸들러
 */
export default function ExchangeSelectableCard({ data, selected, onSelect }) {
  const { title, imgUrl, grade, genre, author, price, quantity } = data;

  return (
    <button
      onClick={onSelect}
      className={[
        'group w-full rounded-xl border bg-[#171717] text-left transition',
        selected
          ? 'border-white/40 shadow-lg'
          : 'border-white/10 hover:border-white/20',
      ].join(' ')}
    >
      {/* 이미지 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/assets/images/card-img.png" //{imgUrl || '/assets/images/logo.svg'}
          alt={title || 'photocard'}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform group-hover:scale-[1.02]"
        />
      </div>

      {/* 본문 */}
      <div className="px-5 pt-4 pb-5">
        {/* 제목 */}
        <h3 className="mb-2 line-clamp-1 text-lg font-bold">{title}</h3>

        {/* 메타 정보 (등급 | 장르 | 작가) */}
        <div className="flex items-center justify-between text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Grade grade={grade} variant="card" size="L" />
            <span className="text-white/50">|</span>
            <span>{genre}</span>
          </div>
          {author && (
            <span className="underline decoration-white/30 underline-offset-2">
              {author}
            </span>
          )}
        </div>

        <hr className="my-4 border-white/10" />

        {/* 가격 / 수량 */}
        <div className="flex items-start justify-between text-sm text-white/80">
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-white/60">가격</span>
              <span className="font-semibold">{price} P</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-white/60">수량</span>
              <span className="font-semibold">{quantity}</span>
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
