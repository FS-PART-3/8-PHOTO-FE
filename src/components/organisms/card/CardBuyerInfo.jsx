'use client';

import { useState } from 'react';
import Grade from '@/components/molecules/Grade';
import Button from '@/components/atoms/Button';
import QuantitySelector from '@/components/molecules/QuantitySelector';

/**
 * 카드 상세 정보 표시 컴포넌트
 * @param userName - 카드 판매자 이름
 * @param grade - 카드 등급 (COMMON, RARE, SUPER RARE, LEGENDARY)
 * @param genre - 카드 장르 (풍경, 인물, 동물, 식물, 사물)
 * @param description - 교환 설명 (exchange 타입일 때만 사용)
 *
 * @param price - 카드 가격
 * @param quantity - 카드 수량
 * @param initQuantity - 초기 수량 (original 타입일 때만 사용)
 */
export default function CardBuyerInfo({
  userName,
  grade,
  genre,
  description,
  price,
  quantity,
  initQuantity,
  onBuy, // 구매하기 handleBuy
}) {
  const [count, setCount] = useState(1);
  const totalPrice = (price || 0) * count;

  return (
    <section className="mx-10 w-[440px]">
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

      <p className="text-lg font-normal text-white">
        {description}
        {/* {myPhotoCard.description} */}
      </p>

      <hr className="my-8 w-full border-t border-[var(--color-gray-400)]" />

      <div className="w-full">
        <div className="mb-[10px] flex justify-between">
          <p className="text-xl font-normal text-[var(--color-gray-300)]">
            가격
          </p>
          <p className="text-2xl font-bold text-white">
            {price} p{/* {listing.price} */}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-normal text-[var(--color-gray-300)]">
              잔여
            </p>
          </div>
          <div className="flex text-2xl">
            <p className="font-bold text-white">
              {quantity}
              {/* {listing.quantity} */}
            </p>
            <p className="font-normal text-[var(--color-gray-300)]">/</p>
            <p className="font-normal text-[var(--color-gray-300)]">
              {initQuantity}
              {/* {listing.initQuantity} */}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <hr className="my-8 w-full border-t border-[var(--color-gray-400)]" />

        <div className="mb-20">
          <div className="mb-5 flex justify-between">
            <p className="text-xl font-normal text-white">구매수량</p>
            <QuantitySelector
              quantity={quantity}
              count={count}
              onChange={setCount}
            />
          </div>

          <div className="flex justify-between">
            <p className="text-xl font-normal text-white">총 가격</p>
            <div className="flex items-center gap-[10px]">
              <p className="text-2xl font-bold text-white">{totalPrice} p</p>
              <p className="text-xl font-normal text-[var(--color-gray-300)]">
                {count} 장
              </p>
            </div>
          </div>
        </div>

        <Button thikness="thick" size="l" onClick={() => onBuy(count)}>
          포토카드 구매하기
        </Button>
      </div>
    </section>
  );
}
