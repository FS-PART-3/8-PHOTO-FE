// 드롭다운 컴포넌트
export default function DropDown({ options, value, onChange, placeholder }) {
  return (
    <div className="dropdown">
      {/* 드롭다운 로직이 여기에 추가될 예정 */}
      <select value={value} onChange={onChange}>
        {placeholder && <option value="">{placeholder}</option>}
        {/* 옵션들이 여기에 렌더링될 예정 */}
      </select>
    </div>
  );
}
