// 버튼 컴포넌트
export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  ...props
}) {
  return (
    <button className={`button button--${variant} button--${size}`} {...props}>
      {children}
    </button>
  );
}
