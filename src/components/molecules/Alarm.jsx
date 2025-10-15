// 알림 컴포넌트
export default function Alarm({ notifications, onRead }) {
  return (
    <div className="alarm">
      {/* 알림 표시 로직이 여기에 추가될 예정 */}
      <span>알림 ({notifications?.length || 0})</span>
    </div>
  );
}
