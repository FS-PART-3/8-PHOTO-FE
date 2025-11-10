'use client';
import Link from 'next/link';
import CardImage from './CardImage';
import CardInfo from './CardInfo';
import CardPriceInfo from './CardPriceInfo';
import CardExchangeSection from './CardExchangeSection';
import { MARKET_CARD_TYPE } from '@/constants/productConstants';

/**
 * 프로젝트 전반에 들어가는 상품 카드 컴포넌트
 * @param type - MARKET_CARD_TYPE.ORIGINAL | MARKET_CARD_TYPE.MY_CARD | MARKET_CARD_TYPE.EXCHANGE | MARKET_CARD_TYPE.FOR_SALE
 * @param cardId - 카드 ID
 * @param title - 카드 제목
 * @param grade - 카드 등급 (COMMON, RARE, SUPER RARE, LEGENDARY)
 * @param genre - 카드 장르 (풍경, 인물, 동물, 식물, 사물)
 * @param imageUrl - 카드 이미지 주소
 * @param watermarkUrl - 워터마크 이미지 주소
 * @param price - 카드 가격
 * @param quantity - 카드 잔여 수량
 * @param initQuantity - 카드 초기 수량
 * @param availableQuantity - 카드 거래 가능 수량
 * @param userName - 카드 판매자 이름
 * @param status - 카드 상태 (FOR_SALE, SOLD_OUT, FOR_EXCHANGE, CANCELLED)
 * @param description - 교환 설명 (exchange 타입일 때만 사용)
 * @param onReject - 거절 버튼 클릭 핸들러 (exchange 타입일 때만 사용)
 * @param onApprove - 승인 버튼 클릭 핸들러 (exchange 타입일 때만 사용)
 *
 * @type 종류:
 * - MARKET_CARD_TYPE.ORIGINAL: 메인 포토카드 페이지 카드
 * - MARKET_CARD_TYPE.MY_CARD: 마이 갤러리 페이지 포토카드
 * - MARKET_CARD_TYPE.EXCHANGE: 교환 페이지 포토카드
 * - MARKET_CARD_TYPE.FOR_SALE: 나의 판매 포토카드 페이지 포토카드
 */
export default function ProductCard({
  type,
  cardId,
  title,
  grade,
  genre,
  imageUrl,
  watermarkUrl,
  status,
  price,
  quantity,
  initQuantity,
  availableQuantity,
  userName,
  description,
  onReject,
  onApprove,
}) {
  return (
    <article className="border-white-10 block w-full border p-10">
      {
        (type = MARKET_CARD_TYPE.MY_CARD ? (
          <CardImage
            imageUrl={imageUrl}
            watermarkUrl={watermarkUrl}
            title={title}
            status={status}
            type={type}
          />
        ) : (
          <Link href={`/market/${cardId}`} className="">
            <CardImage
              imageUrl={imageUrl}
              watermarkUrl={watermarkUrl}
              title={title}
              status={status}
              type={type}
            />
          </Link>
        ))
      }

      <div className="mt-6">
        <CardInfo
          title={title}
          grade={grade}
          genre={genre}
          userName={userName}
          type={type}
          price={price}
        />

        {type === 'exchange' ? (
          <CardExchangeSection
            description={description}
            onReject={onReject}
            onApprove={onApprove}
          />
        ) : (
          <CardPriceInfo
            price={price}
            quantity={quantity}
            initQuantity={initQuantity}
            availableQuantity={availableQuantity}
            type={type}
          />
        )}
      </div>
    </article>
  );
}
