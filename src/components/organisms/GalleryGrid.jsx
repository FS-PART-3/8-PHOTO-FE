// 갤러리 그리드 컴포넌트
export default function GalleryGrid({ children }) {
  return (
    <div className="gallery-grid mx-auto grid min-h-[300px] w-[min(1200px,92vw)] grid-cols-3 gap-4 py-8">
      {children}
    </div>
  );
}
