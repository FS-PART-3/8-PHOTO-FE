import Image from 'next/image';
import { STATUS_MAP } from '@/constants/productConstants';

const DEFAULT_IMAGE_URL = '/assets/images/card-img.png';

/**
 * 카드 이미지 및 상태 표시 컴포넌트
 * @param imageUrl - 카드 이미지 URL
 * @param title - 카드 제목 (alt 텍스트용)
 * @param status - 카드 상태
 */
export default function CardImage({ imageUrl, title, status, type }) {
  const isForSale =
    status !== 'SOLD_OUT' && status !== undefined && type === 'for-sale';

  return (
    <div className="relative">
      {isForSale && (
        <div className="bg-half-black pb-0.2 absolute top-2 left-2 z-10 rounded-sm px-2 pt-1 text-white">
          {STATUS_MAP[status]}
        </div>
      )}

      <div className="relative aspect-[3/2.3]">
        <Image
          src={imageUrl || DEFAULT_IMAGE_URL}
          alt={title}
          fill
          className="object-cover"
          onError={e => {
            e.currentTarget.src = DEFAULT_IMAGE_URL;
          }}
        />
        {status === 'SOLD_OUT' && (
          <div className="absolute inset-0 grid place-items-center bg-black/55 backdrop-blur-[1px]">
            <Image
              src="/assets/icons/ic-sold-out.svg"
              alt="sold-out"
              width={200}
              height={229}
            />
          </div>
        )}
      </div>
    </div>
  );
}
