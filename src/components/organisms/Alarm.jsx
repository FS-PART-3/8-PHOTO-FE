'use client';

import AlarmMessage from '@/components/molecules/AlarmMessage';
import AlarmHeader from '../molecules/AlarmHeader';

export default function Alarm({ alarmList, onClose }) {
  const handleClickClose = () => {
    onClose();
  };

  return (
    <>
      {/* 모바일 헤더 */}
      <AlarmHeader handleClickClose={handleClickClose} />

      {/* 알림 목록 */}
      <div className="xs:absolute xs:top-[25px] xs:right-[0px] xs:left-auto xs:w-auto xs:h-auto xs:max-h-[500px] xs:overflow-y-auto xs:shadow-lg fixed top-[60px] left-0 z-50 h-[calc(100vh-60px)] w-full overflow-y-auto bg-black">
        {alarmList?.data?.map(alarm => (
          <AlarmMessage
            key={alarm.id}
            id={alarm.id}
            isRead={alarm.isRead}
            message={alarm.payload.message}
            createdAt={alarm.createdAt}
          />
        ))}
      </div>
    </>
  );
}
