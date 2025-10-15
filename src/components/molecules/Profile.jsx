// 프로필 컴포넌트
export default function Profile({ user, size = 'medium' }) {
  return (
    <div className={`profile profile--${size}`}>
      {/* 프로필 표시 로직이 여기에 추가될 예정 */}
      <span>{user?.name || '사용자'}</span>
    </div>
  );
}
