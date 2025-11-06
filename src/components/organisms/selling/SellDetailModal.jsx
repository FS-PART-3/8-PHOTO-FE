'use client';

import Image from 'next/image';
import ModalResponsive from '@/components/organisms/modal/ModalResponsive';
import Grade from '@/components/molecules/Grade';
import QuantitySelector from '@/components/molecules/QuantitySelector';
import DropDown from '@/components/molecules/DropDown';
import {
  CREATE_GRADE_OPTIONS,
  CREATE_GENRE_OPTIONS,
} from '@/constants/productConstants';
import { useSellForm } from '@/hooks/useSellForm';
import Title from '@/components/molecules/Title';

/**
 * 판매 상세 모달 (리팩토링)
 */
export default function SellDetailModal({
  open,
  onClose,
  card,
  onConfirm,
  loading = false,
  userName,
}) {
  // react-hook-form 사용 (Hook은 항상 최상단에서 호출)
  const { register, handleSubmit, watch, setValue, errors } = useSellForm(
    card,
    open,
  );

  // watch 값들
  const quantity = watch('quantity');
  const grade = watch('grade');
  const genre = watch('genre');

  // 폼 제출 핸들러
  const onSubmit = data => {
    onConfirm?.({
      myPhotoCardId: card.id,
      price: parseInt(data.price, 10),
      quantity: data.quantity,
      sellerId: card.userId,
      preferredGrade: data.grade,
      preferredGenre: data.genre,
      preferredDescription: data.description || '',
    });
  };

  // Early return은 Hook 호출 후에
  if (!card) return null;

  const maxQuantity = card.quantity || 1;

  // 선택된 등급/장르 옵션
  const selectedGradeOption =
    CREATE_GRADE_OPTIONS.find(opt => opt.value === grade) || null;

  const selectedGenreOption =
    CREATE_GENRE_OPTIONS.find(opt => opt.value === genre) || null;

  return (
    <ModalResponsive isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 pt-6">
          <p className="mb-8 text-sm text-white/60">나의 포토카드 판매하기</p>
          <Title
            size="40"
            text={card.title}
            dividerOffset={0}
            family="primary"
          />
        </div>

        <div className="px-6 pb-6">
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 카드 미리보기 */}
            <div className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={card.imgUrl}
                  alt={card.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                  onError={e => {
                    e.currentTarget.src = '/assets/images/card-img.png';
                  }}
                />
              </div>
            </div>

            {/* 판매 정보 입력 */}
            <div className="flex flex-col">
              {/* 카드 정보 */}
              <div className="mt-4 mb-8 flex items-center justify-between gap-2 border-b border-gray-400 pb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Grade grade={card.grade} variant="card" size="L" />
                  <span className="text-white/50">|</span>
                  <span className="text-lg text-white/70">{card.genre}</span>
                </div>

                <div className="flex items-center justify-end gap-2 text-lg text-white underline">
                  <span>{userName}</span>
                </div>
              </div>

              {/* 총 판매 수량 */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label className="text-lg text-white">총 판매 수량</label>
                  <div className="flex items-center gap-4">
                    <QuantitySelector
                      quantity={maxQuantity}
                      count={quantity}
                      onChange={val => setValue('quantity', val)}
                    />
                    <div>
                      <span className="text-md text-white">
                        / {maxQuantity}
                      </span>
                      <div className="text-right text-sm text-white/40">
                        최대 {maxQuantity}장
                      </div>
                    </div>
                  </div>
                </div>

                {errors.quantity && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* 장면 가격 */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <label className="mb-2 block text-lg text-white">
                  장당 가격
                </label>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      {...register('price')}
                      className="h-[48px] w-full border border-white bg-transparent px-5 pr-12 text-white"
                      placeholder="숫자만 입력"
                    />
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 text-lg text-white">
                      P
                    </span>
                  </div>
                  <p className="mt-1 h-4 text-xs text-red-400">
                    {errors.price && <span>{errors.price.message}</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* 교환 희망 정보 */}
            <div className="mt-20 mb-4">
              <Title
                size="22"
                text="교환 희망 정보"
                dividerOffset={0}
                family="primary"
              />
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="mb-2 block text-lg text-white">등급</label>
                  <DropDown
                    options={CREATE_GRADE_OPTIONS}
                    value={selectedGradeOption}
                    onChange={opt => setValue('grade', opt.value)}
                    placeholder="등급을 선택해 주세요"
                    fontSize="text-sm"
                  />
                  {errors.grade && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.grade.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-lg text-white">장르</label>
                  <DropDown
                    options={CREATE_GENRE_OPTIONS}
                    value={selectedGenreOption}
                    onChange={opt => setValue('genre', opt.value)}
                    placeholder="장르를 선택해 주세요"
                    fontSize="text-sm"
                  />
                  {errors.genre && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.genre.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 교환 희망 설명 */}
            <div className="mb-8">
              <label className="mb-2 block text-lg text-white">
                교환 희망 설명
              </label>
              <textarea
                {...register('description')}
                className="h-[120px] w-full resize-none border border-gray-400 bg-transparent p-4 text-sm text-white placeholder:text-white/40"
                placeholder="내용을 입력해 주세요"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* 버튼 */}
            <div className="mt-auto flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-[56px] flex-1 rounded-[2px] border border-gray-400 bg-transparent text-base font-semibold text-white hover:bg-white/5"
              >
                취소하기
              </button>
              <button
                type="submit"
                disabled={loading}
                className="h-[56px] flex-1 rounded-[2px] bg-[var(--color-main)] text-base font-bold text-[var(--color-black)] disabled:opacity-50"
              >
                판매하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </ModalResponsive>
  );
}
