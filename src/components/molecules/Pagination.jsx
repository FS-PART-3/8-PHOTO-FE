// 페이지네이션 컴포넌트
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      {/* 페이지네이션 로직이 여기에 추가될 예정 */}
      <span>
        페이지 {currentPage} / {totalPages}
      </span>
    </div>
  );
}
