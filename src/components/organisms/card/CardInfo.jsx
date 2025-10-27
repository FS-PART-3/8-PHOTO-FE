import Grade from '../../molecules/Grade';

/**
 * 카드 기본 정보 표시 컴포넌트
 * @param title - 카드 제목
 * @param grade - 카드 등급
 * @param genre - 카드 장르
 * @param userName - 판매자 이름
 * @param type - 카드 타입
 * @param price - 가격 (exchange 타입일 때만 사용)
 */
export default function CardInfo({
  title,
  grade,
  genre,
  userName,
  type,
  price,
}) {
  return (
    <div>
      <h3 className="truncate text-[15px] font-medium text-white">{title}</h3>
      <div className="mt-1 flex items-center justify-between gap-2 text-[13px] text-white/70">
        {/* 등급 및 장르 */}
        <div className="flex items-center gap-2">
          <Grade grade={grade} size="L" />
          <span className="h-3 w-[1px] bg-gray-300 text-[16px]"></span>
          <span className="text-[16px] text-gray-300">{genre}</span>
          {type === 'exchange' && (
            <>
              <span className="h-3 w-[1px] bg-gray-300 text-[16px]"></span>
              <span className="text-[16px] text-gray-300">
                <span className="text-white">{price}P </span>에 구매
              </span>
            </>
          )}
        </div>
        {/* 유저 이름 */}
        <div>
          <span className="text-[16px] text-white underline">{userName}</span>
        </div>
      </div>
    </div>
  );
}
