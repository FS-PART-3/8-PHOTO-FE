// 칩 컴포넌트
export default function Chip({ children, variant = 'default', ...props }) {
  return (
    <span className={`chip chip--${variant}`} {...props}>
      {children}
    </span>
  );
}
