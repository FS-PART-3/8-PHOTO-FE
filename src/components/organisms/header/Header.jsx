'use client';
import { useState } from 'react';
import DetailPageHeader from './DetailPageHeader';
import MainHeader from './MainHeader';

// 헤더 컴포넌트
export default function Header() {
  const [isDetailPage, setIsDetailPage] = useState(false);

  return (
    <header className="w-full bg-black">
      {isDetailPage ? <DetailPageHeader /> : <MainHeader />}
    </header>
  );
}
