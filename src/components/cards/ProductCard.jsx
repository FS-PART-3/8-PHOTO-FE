'use client';
import Image from 'next/image';

export default function ProductCard({
  title,
  grade,
  genre,
  imageUrl,
  price,
  isSoldOut,
  sellerName,
}) {
  return (
    <article
      className="
        group relative rounded-[12px] border border-white/8 bg-[#121212]
        hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]
        transition-transform
      "
      aria-label={`${title}, ${price}P${isSoldOut ? ', 품절' : ''}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-[12px] bg-neutral-800/40">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width:1200px) 25vw, (min-width:744px) 33vw, 50vw"
            className="object-cover"
            priority={false}
          />
        )}

        {isSoldOut && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] grid place-items-center">
            <span className="rounded-full border border-yellow-300/60 px-4 py-2 text-sm font-semibold text-yellow-300">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="truncate text-[15px] font-medium text-white">{title}</h3>
        <div className="mt-1 flex items-center justify-between text-[13px] text-white/70">
          <span>{grade}</span>
          <span>{genre}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <strong className="text-[16px] font-semibold text-white">
            {price.toLocaleString()}P
          </strong>
          <span className="text-[12px] text-white/60">{sellerName}</span>
        </div>
      </div>
    </article>
  );
}
