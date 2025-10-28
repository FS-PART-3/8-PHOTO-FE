'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Grade from '@/components/molecules/Grade';
import Button from '@/components/atoms/Button';

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
}) {
  const [count, setCount] = useState(1);
  const totalPrice = (price || 0) * count;

  const handleIncrease = () => {
    if (count < quantity) setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleBuy = async () => {
    // 구매하기 API
  };

  return (
    <section className="mx-10 w-[440px]">
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

      <p className="text-lg font-normal text-white">
        {description}
        {/* {myPhotoCard.description} */}
      </p>

      <hr className="my-8 w-full border-t border-[#5a5a5a]" />

      <div className="w-full">
        <div className="mb-[10px] flex justify-between">
          <p className="text-xl font-normal text-[#a4a4a4]">가격</p>
          <p className="text-2xl font-bold text-white">
            {price} p{/* {listing.price} */}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-normal text-[#a4a4a4]">잔여</p>
          </div>
          <div className="flex text-2xl">
            <p className="font-bold text-white">
              {quantity}
              {/* {listing.quantity} */}
            </p>
            <p className="font-normal text-[#a4a4a4]">/</p>
            <p className="font-normal text-[#a4a4a4]">
              {initQuantity}
              {/* {listing.initQuantity} */}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <hr className="my-8 w-full border-t border-[#5a5a5a]" />

        <div className="mb-20">
          <div className="mb-5 flex justify-between">
            <p className="text-xl font-normal text-white">구매수량</p>
            <div className="w-[180px] rounded-xs border border-white px-3 py-2">
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
          </div>

          <div className="flex justify-between">
            <p className="text-xl font-normal text-white">총 가격</p>
            <div className="flex items-center gap-[10px]">
              <p className="text-2xl font-bold text-white">{totalPrice} p</p>
              <p className="text-xl font-normal text-[#a4a4a4]">{count} 장</p>
            </div>
          </div>
        </div>

        <Button thikness="thick" size="l" onClick={handleBuy}>
          포토카드 구매하기
        </Button>
      </div>
    </section>
  );
}
