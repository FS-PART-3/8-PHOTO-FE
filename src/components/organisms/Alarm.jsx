'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import AlarmMessage from '@/components/molecules/AlarmMessage';
import AlarmHeader from '../molecules/AlarmHeader';

export default function Alarm({
  alarmPages,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  onClose,
}) {
  // useInView 훅 사용
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1,
  });

  const handleClickClose = () => {
    onClose();
  };

  // inView가 true가 되면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 알림을 평탄화
  const allAlarms = alarmPages?.flatMap(page => page.data || []) || [];

  return (
    <>
      {/* 모바일 헤더 */}
      <AlarmHeader handleClickClose={handleClickClose} />

      {/* 알림 목록 */}
      <div className="xs:absolute xs:top-[25px] xs:right-[0px] xs:left-auto xs:w-auto xs:h-auto xs:max-h-[500px] xs:overflow-y-auto xs:shadow-lg fixed top-[60px] left-0 z-50 h-[calc(100vh-60px)] w-full overflow-y-auto bg-black">
        {allAlarms.map(alarm => (
          <AlarmMessage
            key={alarm.id}
            id={alarm.id}
            isRead={alarm.isRead}
            message={alarm.payload.message}
            createdAt={alarm.createdAt}
          />
        ))}

        {/* 무한 스크롤 트리거 */}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="flex h-[50px] items-center justify-center"
          >
            {isFetchingNextPage && (
              <span className="text-gray-300">로딩 중...</span>
            )}
          </div>
        )}

        {/* 더 이상 알림이 없을 때 */}
        {!hasNextPage && allAlarms.length > 0 && (
          <div className="flex h-[50px] items-center justify-center">
            <span className="text-gray-300">모든 알림을 확인했습니다</span>
          </div>
        )}

        {/* 알림이 없을 때 */}
        {allAlarms.length === 0 && (
          <div className="flex h-[200px] items-center justify-center">
            <span className="text-gray-300">알림이 없습니다</span>
          </div>
        )}
      </div>
    </>
  );
}
