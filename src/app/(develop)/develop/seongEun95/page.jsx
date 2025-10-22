'use client';

import Pagination from '@/components/molecules/Pagination';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/header/Header';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchData = async page => {
  const response = await fetch(
    `http://localhost:4000/api/my-photo-cards/sales?page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  return data;
};

const MyPhotoCards = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-white">
      {data.map(item => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-4 rounded-lg bg-gray-800 p-4 shadow-md"
        >
          <img
            src={item.imgUrl}
            alt={item.title}
            className="h-24 w-24 rounded-lg object-cover"
          />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{item.title}</span>
              <span className="rounded-full bg-blue-700 px-2 py-0.5 text-xs">
                {item.grade}
              </span>
              <span className="rounded-full bg-green-700 px-2 py-0.5 text-xs">
                {item.genre}
              </span>
            </div>
            <span className="text-sm text-gray-300">{item.description}</span>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="font-bold text-yellow-400">₩{item.price}</span>
              <span>수량: {item.quantity}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-white">
              <span>작성자: {item.user?.name || '-'}</span>
              <span>생성일: {item.createdAt?.slice(0, 10) || '-'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// seongEun95 개발자 컴포넌트 테스트 페이지
export default function SeongEun95Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-photo-cards', currentPage],
    queryFn: () => fetchData(currentPage),
  });
  console.log(data);

  const handlePageChange = page => {
    console.log(`페이지 ${page}로 이동`);
    setCurrentPage(page);
  };
  return (
    <div className="developer-page">
      {/* 개발자가 작업할 컴포넌트들이 여기에 추가될 예정 */}
      <Header />
      <main className="flex min-h-[300px] items-center justify-center">
        <MyPhotoCards data={data?.cards || []} />
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data?.countsGroup?.totalCounts / 15)}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
