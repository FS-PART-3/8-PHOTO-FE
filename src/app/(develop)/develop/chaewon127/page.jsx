'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import Grade from '@/components/molecules/Grade';
import ProductCard from '@/components/organisms/card/ProductCard';

// chaewon127 개발자 컴포넌트 테스트 페이지
export default function Chaewon127Page({
  userName,
  grade,
  genre,
  description,
  price,
  quantity,
  initQuantity,
  onBuy,
  preferredGrade,
  preferredGenre,
  preferredDescription,
  onUpdate,
  onDelete,
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
    <div className="mt-10 flex">
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

          <Button thikness="thick" size="l" onClick={() => onBuy(count)}>
            포토카드 구매하기
          </Button>
        </div>
      </section>

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

        <div className="mt-15 w-full">
          <div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/ic_exchange.svg"
                alt="exchange icon"
                width={28}
                height={28}
              />
              <p className="text-[28px] font-bold text-white">교환 희망 정보</p>
            </div>
            <hr className="mb-8 w-full border-t border-[#eeeeee]" />
          </div>

          <div>
            <div className="flex items-start gap-[15px]">
              <Grade grade={preferredGrade} variant="card" size="L" />
              {/* {listing.preferredGrade} */}

              <div className="h-[25px] border-l border-[#5a5a5a]" />

              <p className="text-2xl font-bold text-[#a4a4a4]">
                {preferredGenre}
                {/* {listing.preferredGenre} */}
              </p>
            </div>

            <hr className="my-8 w-full border-t border-[#5a5a5a]" />

            <p className="mb-20 text-lg font-normal text-white">
              {preferredDescription}
              {/* {listing.preferredDescription} */}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <Button thikness="thick" size="l" onClick={onUpdate}>
              수정하기
            </Button>
            <Button variant="secondary" onClick={onDelete}>
              판매 내리기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
