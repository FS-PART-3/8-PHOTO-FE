'use client';

import Image from 'next/image';

export default function QuantitySelector({ quantity, count, onChange }) {
  const handleIncrease = () => {
    if (count < quantity) onChange(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) onChange(count - 1);
  };

  return (
    <div className="w-[176px] rounded-xs border border-[var(--color-gray-200)] px-3 py-2">
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
  );
}
