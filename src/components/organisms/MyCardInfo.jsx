'use client';

import Grade from '../molecules/Grade';

const GRADE_LIST = ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'];

export default function MyCardInfo({ userName, countsGroup }) {
  return (
    <div className="border-b border-gray-400 pb-[20px]">
      <h2 className="mt-[40px] mb-[20px] text-2xl font-bold text-white">
        {userName}님이 보유한 포토카드 ({countsGroup?.totalCounts || 0}장)
      </h2>

      <div className="flex gap-[10px]">
        {GRADE_LIST.map(grade => (
          <Grade
            key={grade}
            grade={grade}
            variant="my_card"
            size="L"
            num={countsGroup?.gradeCounts?.[grade] || 0}
          />
        ))}
      </div>
    </div>
  );
}
