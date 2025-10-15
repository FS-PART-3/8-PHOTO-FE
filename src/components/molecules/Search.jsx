// 검색 컴포넌트
export default function Search({
  value,
  onChange,
  onSubmit,
  placeholder = '검색어를 입력하세요',
}) {
  return (
    <div className="search">
      {/* 검색 로직이 여기에 추가될 예정 */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}
