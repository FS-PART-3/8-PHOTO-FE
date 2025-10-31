// 모달 컴포넌트
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* 모달 내용이 여기에 추가될 예정 */}
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
