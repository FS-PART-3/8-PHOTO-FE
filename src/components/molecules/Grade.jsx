// 등급 표시 컴포넌트
export default function Grade({ grade, showLabel = true }) {
  return (
    <div className="grade">
      {/* 등급 표시 로직이 여기에 추가될 예정 */}
      {showLabel && <span className="grade-label">등급: {grade}</span>}
    </div>
  );
}
