// 보호된 라우트 레이아웃 (로그인 필요)
export default function ProtectedLayout({ children }) {
  return (
    <div className="protected-layout">
      {/* 인증된 사용자용 레이아웃 추가될 예정 */}
      <main>{children}</main>
      {/* 인증된 사용자용 레이아웃 추가될 예정 */}
    </div>
  );
}
