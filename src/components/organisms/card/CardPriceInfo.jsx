import Image from 'next/image';

/**
 * 카드 가격 및 수량 정보 표시 컴포넌트
 * @param price - 카드 가격
 * @param quantity - 카드 수량
 * @param initQuantity - 초기 수량 (original 타입일 때만 사용)
 * @param type - 카드 타입
 */
export default function CardPriceInfo({ price, quantity, initQuantity, type }) {
  return (
    <>
      <div className="mt-2 border-t border-gray-400 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[16px] text-gray-300">가격</span>
          <strong className="text-[18px] font-semibold text-white">
            {price} P
          </strong>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[16px] text-gray-300">
            {type === 'my-card' ? '수량' : '잔여'}
          </span>
          <strong className="text-[18px] text-white">
            {quantity} {type === 'original' && ` / ${initQuantity ?? 0}`}
          </strong>
        </div>
      </div>
      {/* 카드 하단 이미지 */}
      <div className="mt-7 flex justify-center">
        <Image
          src="/assets/images/card-bottom-img.svg"
          alt="card-bottom-img"
          width={100}
          height={18}
        />
      </div>
    </>
  );
}
