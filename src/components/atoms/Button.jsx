'use client';

// 버튼 컴포넌트
export default function Button({
  children,
  variant = 'primary',
  size = 'l',
  thikness = 'thick',
  disabled = false,
  onClick,
  ...props
}) {
  const defaultStyles =
    'rounded-[2px] transition duration-200 ease-in-out hover:opacity-90 w-full flex items-center justify-center font-bold cursor-pointer';

  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-[var(--color-gray-400)] text-[var(--color-gray-300)] hover:opacity-100 cursor-not-allowed';
    }

    switch (variant) {
      case 'primary':
        return 'bg-[var(--color-main)] text-[var(--color-black)]';
      case 'secondary':
        return 'bg-[var(--color-gray-500)] text-[var(--color-white)] border border-[var(--color-gray-100)] hover:bg-[var(--color-gray-400)]';
      default:
        return 'bg-[var(--color-main)] text-[var(--color-black)]';
    }
  };

  const getSizeClasses = () => {
    if (thikness === 'thick') {
      switch (size) {
        case 'l':
          return 'max-w-[440px] min-h-[80px] text-[20px]';
        case 'm':
          return 'max-w-[345px] min-h-[75px] text-[18px]';
        default:
          return 'max-w-[440px] min-h-[80px] text-[20px]';
      }
    } else if (thikness === 'thin') {
      switch (size) {
        case 'l':
          return 'max-w-[520px] min-h-[60px] text-[18px]';
        case 'm':
          return 'max-w-[440px] min-h-[55px] text-[16px]';
        case 's':
          return 'max-w-[345px] min-h-[55px] text-[16px]';
        case 'xs':
          return 'max-w-[150px] min-h-[40px] text-[12px]';
        default:
          return 'max-w-[520px] min-h-[60px] text-[18px]';
      }
    }
  };

  return (
    <button
      className={`${defaultStyles} ${getVariantClasses()} ${getSizeClasses()} `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
