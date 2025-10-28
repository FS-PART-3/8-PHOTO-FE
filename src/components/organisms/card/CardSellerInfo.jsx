'use client';
import Image from 'next/image';
import Grade from '@/components/molecules/Grade';
import Button from '@/components/atoms/Button';

/**
 * 카드 상세 정보 및 교환 희망 카드 정보 표시 컴포넌트
 * @param userName - 카드 판매자 이름
 * @param grade - 카드 등급 (COMMON, RARE, SUPER RARE, LEGENDARY)
 * @param genre - 카드 장르 (풍경, 인물, 동물, 식물, 사물)
 * @param description - 교환 설명 (exchange 타입일 때만 사용)
 *
 * @param price - 카드 가격
 * @param quantity - 카드 수량
 * @param initQuantity - 초기 수량 (original 타입일 때만 사용)
 * @param preferredGrade - 교환 카드 등급 (COMMON, RARE, SUPER RARE, LEGENDARY)
 * @param preferredGenre - 교환 카드 장르 (풍경, 인물, 동물, 식물, 사물)
 * @param preferredDescription - 교환 설명 (exchange 타입일 때만 사용)
 */
export default function CardSellerInfo({
  userName,
  grade,
  genre,
  description,
  price,
  quantity,
  initQuantity,
  preferredGrade,
  preferredGenre,
  preferredDescription,
  onUpdate, // 수정하기 handleUpdate
  onDelete, // 판매 내리기 handleDelete
}) {
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
  );
}
