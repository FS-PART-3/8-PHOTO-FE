// 카드 컴포넌트
export default function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {/* 카드 내용이 여기에 추가될 예정 */}
      {children}
    </div>
  );
}
