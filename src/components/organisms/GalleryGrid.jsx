// 갤러리 그리드 컴포넌트
export default function GalleryGrid({ items = [] }) {
  return (
    <div className="gallery-grid">
      {/* 갤러리 그리드 로직이 여기에 추가될 예정 */}
      {items.map((item, index) => (
        <div key={index} className="gallery-grid__item">
          {/* 갤러리 아이템 내용 */}
        </div>
      ))}
    </div>
  );
}
