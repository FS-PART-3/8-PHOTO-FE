'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import Grade from '@/components/molecules/Grade';
import QuantitySelector from '@/components/molecules/QuantitySelector';
import { global } from 'styled-jsx/css';
import ProductCard from '@/components/organisms/card/ProductCard';
import Input from '@/components/atoms/Input';

// chaewon127 개발자 컴포넌트 테스트 페이지
export default function Chaewon127Page({
  userName,
  grade,
  genre,
  description,
  price,
  quantity = 5,
  initQuantity,
  onBuy,
  preferredGrade,
  preferredGenre,
  preferredDescription,
  onUpdate,
  onDelete,
}) {
  const [count, setCount] = useState(1);
  const [localPrice, setLocalPrice] = useState(price ?? '');

  const totalPrice = (price || 0) * count;

  const handleCountChange = val => {
    if (val > 3) return;
    setCount(val);
  };

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');

  return (
    <div className="developer-page min-h-screen bg-[var(--color-black)]">
      <div className="mb-10">
        <h2 className="text-[var(--color-white)]">chaewon127 개발자 페이지</h2>
        <p className="text-[var(--color-white)]">
          컴포넌트 테스트 및 개발 작업을 위한 페이지입니다.
        </p>
        {/* 개발자가 작업할 컴포넌트들이 여기에 추가될 예정 */}
      </div>

      <div className="flex">
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
                  <p className="text-2xl font-bold text-white">
                    {totalPrice} p
                  </p>
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

          <div className="mt-15 w-full">
            <div>
              <div className="flex gap-2">
                <Image
                  src="/assets/icons/ic_exchange.svg"
                  alt="exchange icon"
                  width={28}
                  height={28}
                />
                <p className="text-[28px] font-bold text-white">
                  교환 희망 정보
                </p>
              </div>
              <hr className="mb-8 w-full border-t border-[var(--color-gray-100)]" />
            </div>

            <div>
              <div className="flex items-start gap-[15px]">
                <Grade grade={preferredGrade} variant="card" size="L" />
                {/* {listing.preferredGrade} */}

                <div className="h-[25px] border-l border-[var(--color-gray-400)]" />

                <p className="text-2xl font-bold text-[var(--color-gray-300)]">
                  {preferredGenre}
                  {/* {listing.preferredGenre} */}
                </p>
              </div>

              <hr className="my-8 w-full border-t border-[var(--color-gray-400)]" />

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

      <div className="mx-10 mb-20 flex w-[400px] flex-col gap-6">
        <Input
          label="기본테스트"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="기본테스트 Input"
        />
        <Input
          label="비번테스트"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비번테스트 Input"
        />
        <Input
          label="비번확인테스트"
          type="password"
          id="confirm"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          placeholder="비번확인테스트 Input"
        />
        <Input
          label="이메일테스트"
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="이메일테스트 Input"
        />
        <Input
          label="닉네임테스트"
          type="text"
          id="nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="테스트 Input"
        />
        <Input
          label="가격테스트"
          type="number"
          id="price"
          value={localPrice}
          onChange={e => setLocalPrice(e.target.value)}
          placeholder="가격테스트 Input"
        />
        <Input
          label="포토카드이름테스트"
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="포토카드이름테스트 Input"
        />
      </div>
    </div>
  );
}
