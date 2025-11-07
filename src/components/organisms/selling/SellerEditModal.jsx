'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import ModalResponsive from '@/components/organisms/modal/ModalResponsive';
import DropDown from '@/components/molecules/DropDown';
import {
  GRADE_OPTIONS,
  GENRE_OPTIONS,
  GRADE_DISPLAY_MAP,
} from '@/constants/productConstants';
import Button from '@/components/atoms/Button';
import Grade from '@/components/molecules/Grade';
import QuantitySelector from '@/components/molecules/QuantitySelector';

export default function SellerEditModal({ open, onClose, items, onUpdate }) {
  const {
    myPhotoCard,
    price,
    quantity,
    preferredGrade,
    preferredGenre,
    preferredDescription,
  } = items || {};

  const title = myPhotoCard?.title ?? '';
  const imgUrl = myPhotoCard?.imgUrl ?? '';

  const cardGrade = myPhotoCard?.grade ?? 'UNKNOWN';
  const cardGenre = myPhotoCard?.genre ?? '장르 미정';
  const name = items?.seller.name || '이름 없음';
  const maxQuantity = items?.initQuantity || 1;
  const currentQuantity = items?.quantity ?? 1;
  const mapGrade = v => (v === 'SUPERRARE' ? 'SUPER_RARE' : v);
  // 1) 폼 초기 스냅샷
  const initialForm = useMemo(
    () => ({
      price: price ?? 0,
      quantity: currentQuantity,
      preferredGrade: mapGrade(preferredGrade ?? cardGrade) || 'UNKNOWN',
      preferredGenre: (preferredGenre ?? cardGenre) || '장르 미정',
      preferredDescription: preferredDescription ?? '',
    }),
    [
      price,
      quantity,
      preferredGrade,
      preferredGenre,
      preferredDescription,
      cardGrade,
      cardGenre,
    ],
  );
  const [count, setCount] = useState(1);
  // 2) 실제 폼 상태
  const [form, setForm] = useState(initialForm);

  const [wasOpened, setWasOpened] = useState(false);
  useEffect(() => {
    if (open && !wasOpened) {
      setForm(initialForm);
      setWasOpened(true);
    }
    if (!open && wasOpened) {
      setWasOpened(false);
    }
  }, [open, wasOpened, initialForm]);

  const handleUpdate = async () => {
    console.log('수정하기 클릭됨');
    console.log('초기판매수량:', items?.quantity ?? 1);
    console.log('보낼 가격:', form.price);
    console.log('보낼 수량(count):', count);
    console.log('기존 원래 initial quantity:', form.quantity);
    const payload = {
      price: Number(form.price) || 0,
      quantity: Number(count) || 1,
      preferredGrade: mapGrade(form.preferredGrade) || undefined,
      preferredGenre: form.preferredGenre,
      preferredDescription: (form.preferredDescription || '').trim(),
    };
    console.log('[PATCH payload]', payload);
    await onUpdate?.(payload);
  };

  return (
    <ModalResponsive isOpen={open} onClose={onClose}>
      {/* 헤더 */}
      <header className="mb-6 border-b border-white/10 pb-5">
        <p className="beskin-h6 mt-10 text-sm text-white/60">수정하기</p>
        <p
          className="mt-2 line-clamp-2 text-3xl font-bold break-words text-white/90"
          title={title || '제목 없음'}
        >
          {title || '제목 없음'}
        </p>
      </header>

      {/* 상단 그리드 */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 이미지 */}
        <div className="overflow-hidden">
          {imgUrl ? (
            <div className="relative h-72 w-full">
              <Image
                src={'/assets/images/card-img.png'} //{imgUrl}
                alt="preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="grid h-72 w-full place-items-center bg-white/5 text-white/40">
              이미지 미리보기
            </div>
          )}
        </div>

        {/* 카드 상세 */}
        <div className="space-y-6">
          <div className="mt-4 mb-8 flex items-center justify-between gap-2 border-b border-gray-400 pb-4 text-sm">
            <div className="flex items-center gap-2">
              <Grade grade={cardGrade} variant="card" size="L" />
              <span className="text-white/50">|</span>
              <span className="text-lg text-white/70">{cardGenre}</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-lg text-white underline">
              <span>{name}</span>
            </div>
          </div>

          {/* 총 판매 수량 */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="text-lg text-white">총 판매 수량</label>
              <div className="flex items-center gap-4">
                <QuantitySelector
                  quantity={maxQuantity}
                  count={count}
                  onChange={val => setCount(val)}
                />
                <div>
                  <span className="text-md text-white">/ {maxQuantity}</span>
                  <div className="text-right text-sm text-white/40">
                    최대 {maxQuantity}장
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 장당 가격 */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <label className="mb-2 block text-lg text-white">장당 가격</label>
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="h-[48px] w-full border border-white bg-transparent px-5 pr-12 text-white"
                  placeholder="숫자만 입력"
                  value={form.price}
                  onChange={e =>
                    setForm(prev => ({
                      ...prev,
                      price: e.target.value.replace(/[^\d]/g, ''),
                    }))
                  }
                />
                <span className="absolute top-1/2 right-4 -translate-y-1/2 text-lg text-white">
                  P
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 교환 희망 정보 */}
      <section className="mt-10 border-t border-white/10 pt-8">
        <h3 className="mb-6 text-xl font-extrabold text-white">
          교환 희망 정보
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 등급 */}
          <div>
            <label className="mb-2 block text-sm text-white/70">등급</label>
            <DropDown
              options={GRADE_OPTIONS}
              value={form.preferredGrade}
              onChange={option =>
                setForm(prev => ({
                  ...prev,
                  preferredGrade: option?.value ?? null,
                }))
              }
              placeholder={GRADE_DISPLAY_MAP[myPhotoCard?.grade] || '등급'}
              fontSize="text-sm"
            />
          </div>
          {/* 장르 */}
          <div>
            <label className="mb-2 block text-sm text-white/70">장르</label>
            <DropDown
              options={GENRE_OPTIONS}
              value={form.preferredGenre}
              onChange={option =>
                setForm(prev => ({
                  ...prev,
                  preferredGenre: option?.value ?? null,
                }))
              }
              placeholder={myPhotoCard?.genre || '장르'}
              fontSize="text-sm"
            />
          </div>

          {/* 설명 */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-white/70">
              교환 희망 설명
            </label>
            <textarea
              rows={4}
              className="w-full rounded border border-white/15 bg-[#141414] p-3 text-white"
              placeholder="자세한 설명을 적어주세요."
              value={form.preferredDescription}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  preferredDescription: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </section>

      {/* 제출 버튼들 */}
      <div className="mt-8 flex grid grid-cols-2 items-center justify-end gap-3 gap-4">
        <Button
          size="l"
          thikness="thin"
          variant="secondary"
          onClick={onClose}
          className="!h-[60px] !border !border-white/20 border-white !bg-transparent !text-white/90 hover:!bg-white/10"
        >
          취소하기
        </Button>
        <Button
          size="l"
          thikness="thick"
          variant="primary"
          onClick={handleUpdate}
          className="!h-[60px] !bg-[var(--color-main)] !text-[var(--color-black)] hover:!brightness-95"
        >
          수정하기
        </Button>
      </div>
    </ModalResponsive>
  );
}
