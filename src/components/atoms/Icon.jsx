// 아이콘 컴포넌트
export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
  ...props
}) {
  return (
    <svg width={size} height={size} fill={color} className="icon" {...props}>
      {/* 아이콘 SVG 패스가 여기에 추가될 예정 */}
      <use href={`#icon-${name}`} />
    </svg>
  );
}
