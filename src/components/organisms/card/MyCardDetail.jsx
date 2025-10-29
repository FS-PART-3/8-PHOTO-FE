'use client';

import { useState } from 'react';
import Image from 'next/image';
import Grade from '@/components/molecules/Grade';

export default function MyCardDetail() {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    if (count < quantity) setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <section className="mx-10 mb-10 w-[440px]">
      <div className="flex w-full justify-between">
        <div className="flex items-start gap-[15px]">
          <Grade grade={grade} variant="card" size="L" />
          {/* {myPhotoCard.grade} */}

          <div className="h-[25px] border-l border-[#5a5a5a]" />

          <p className="text-2xl font-bold text-[#a4a4a4]">
            {genre}
            {/* {myPhotoCard.genre} */}
          </p>
        </div>
        <p className="text-2xl font-bold text-white underline">
          {userName}
          {/* {user.name} */}
        </p>
      </div>

      <hr className="my-8 w-full border-t border-[#5a5a5a]" />

      <div className="w-full">
        <div className="mb-5 flex justify-between">
          <p className="text-xl font-normal text-white">총 판매 수량</p>
          <div className="flex">
            {/* QuantitySelector 컴포넌트 분리 */}
            <div className="w-[176px] rounded-xs border border-(--gray-gray200) px-3 py-2">
              <div className="flex items-center justify-between text-white">
                <button onClick={handleDecrease}>
                  <Image
                    src="/assets/icons/ic_-.svg"
                    alt="- icon"
                    width={24}
                    height={24}
                  />
                </button>
                <p>{count}</p>
                <button onClick={handleIncrease}>
                  <Image
                    src="/assets/icons/ic_+.svg"
                    alt="+ icon"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
            {/* QuantitySelector 컴포넌트 분리 */}
            <div className="ml-5">
              <p className="text-xl font-bold text-white">/3</p>
              <p className="text-sm font-light text-(--gray-gray200)">
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
              value={price}
              className="w-[245px] appearance-none rounded-xs border border-(--gray-gray200) px-3 py-2 text-base font-light text-white placeholder-(--gray-gray200)"
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
