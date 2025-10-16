'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function DetailPageHeader() {
  const [detailPageTitle, setDetailPageTitle] = useState('마이페이지');

  const handleClickBack = () => {
    console.log('back');
  };
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-5 xl:px-0">
      <div className="h-[22px]">
        <button className="cursor-pointer" onClick={handleClickBack}>
          <Image
            src="/assets/icons/ic_back.svg"
            alt="back"
            width={22}
            height={22}
          />
        </button>
      </div>
      <div>
        <h1 className="beskin-h5 !text-[20px] text-gray-200">
          {detailPageTitle}
        </h1>
      </div>
      <div></div>
    </div>
  );
}
