'use client';
import Image from 'next/image';
import Grade from '../molecules/Grade';
import Link from 'next/link';
import { STATUS_MAP } from '@/constants/productConstants';

export default function ProductCard({ type, cards }) {
  const imageUrl = '/assets/images/card-img.png';
  const isSoldOut = cards.quantity <= 0;

  return (
    <article>
      <Link
        href={`/market/${cards.id}`}
        className="border-white-10 block w-full border p-10"
      >
        <div className="relative">
          <div className="bg-half-black pb-0.2 absolute top-2 left-2 z-10 rounded-sm px-2 pt-1 text-white">
            {STATUS_MAP[cards.status]}
          </div>

          <div className="relative aspect-[4/3]">
            {cards.imageUrl ||
              (imageUrl && (
                <Image
                  src={cards.imageUrl || imageUrl}
                  alt={cards.title}
                  fill
                  className="object-cover"
                />
              ))}

            {isSoldOut && (
              <div className="absolute inset-0 grid place-items-center bg-black/55 backdrop-blur-[1px]">
                <Image
                  src="/assets/icons/ic-sold-out.svg"
                  alt="sold-out"
                  width={230}
                  height={230}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="truncate text-[15px] font-medium text-white">
            {cards.title}
          </h3>
          <div className="mt-1 flex items-center justify-between gap-2 text-[13px] text-white/70">
            <div className="flex items-center gap-2">
              <Grade grade={cards.grade} size="L" />
              <span className="h-3 w-[1px] bg-gray-300 text-[16px]"></span>
              <span className="text-[16px] text-gray-300">{cards.genre}</span>
            </div>
            <div>
              <span className="text-[16px] text-white underline">
                {cards.user.name}
              </span>
            </div>
          </div>
          <div className="mt-2 border-t border-gray-400 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[16px] text-gray-300">가격</span>
              <strong className="text-[18px] font-semibold text-white">
                {cards.price} P
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[16px] text-gray-300">잔여</span>
              <strong className="text-[18px] text-white">
                {cards.quantity}
              </strong>
            </div>
          </div>
          <div className="mt-7 flex justify-center">
            <Image
              src="/assets/images/card-bottom-img.svg"
              alt="card-bottom-img"
              width={100}
              height={100}
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
