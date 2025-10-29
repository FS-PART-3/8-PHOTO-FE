'use client';

import { useState } from 'react';
import Grade from '@/components/molecules/Grade';
import QuantitySelector from '@/components/molecules/QuantitySelector';

export default function MyCardDetail({
  grade,
  genre,
  userName,
  quantity = 3,
  price,
}) {
  const [count, setCount] = useState(1);
  const [localPrice, setLocalPrice] = useState(price ?? '');

  const handleCountChange = val => {
    if (val > 3) return;
    setCount(val);
  };

  return (
    <section className="mx-10 mb-10 w-[440px]">
      <div className="flex w-full justify-between">
        <div className="flex items-start gap-[15px]">
          <Grade grade={grade} variant="card" size="L" />
          {/* {myPhotoCard.grade} */}

          <div className="h-[25px] border-l border-[var(--color-gray-400)]" />

          <p className="text-2xl font-bold text-[var(--color-gray-300)]">
            {genre}
            {/* {myPhotoCard.genre} */}
          </p>
        </div>
        <p className="text-2xl font-bold text-white underline">
          {userName}
          {/* {user.name} */}
        </p>
      </div>

      <hr className="my-8 w-full border-t border-[var(--color-gray-400)]" />

      <div className="w-full">
        <div className="mb-5 flex justify-between">
          <p className="text-xl font-normal text-white">총 판매 수량</p>
          <div className="flex">
            <QuantitySelector
              quantity={quantity}
              count={count}
              onChange={handleCountChange}
            />
            <div className="ml-5">
              <p className="text-xl font-bold text-white">/3</p>
              <p className="text-sm font-light text-[var(--color-gray-200)]">
                최대 3장
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <label className="text-xl font-normal text-white">장당 가격</label>
          <div className="relative">
            <input
              type="number"
              id="price"
              placeholder="숫자만 입력"
              value={localPrice}
              onChange={e => setLocalPrice(e.target.value)}
              className="w-[245px] rounded-xs border border-[var(--color-gray-200)] px-3 py-2 text-base font-light text-white placeholder-[var(--color-gray-200)]"
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xl font-bold text-white">
              P
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
