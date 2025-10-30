'use client';

import Image from 'next/image';

/**
 * 공통 검색 인풋 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.value - 검색어 값 (제어 컴포넌트)
 * @param {function} props.onChange - 입력값 변경 핸들러
 * @param {function} props.onSubmit - 검색 제출 핸들러 (Enter 키 또는 아이콘 클릭)
 * @param {function} props.onClear - 검색어 초기화 핸들러
 * @param {string} props.placeholder - 플레이스홀더 텍스트
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {boolean} props.autoFocus - 자동 포커스 여부
 * @param {string} props.className - 추가 CSS 클래스
 * @param {'sm' | 'md' | 'lg'} props.size - 컴포넌트 크기
 * @param {boolean} props.showSearchIcon - 검색 아이콘 표시 여부
 * @param {number} props.maxLength - 최대 입력 길이
 * @param {React.Ref} props.ref - input 엘리먼트에 대한 ref
 */
export default function Search({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = '검색',
  disabled = false,
  autoFocus = false,
  className = '',
  size = 'md',
  showSearchIcon = false,
  maxLength,
  ref,
  ...restProps
}) {
  // 검색 제출 핸들러
  const handleSubmit = () => {
    if (disabled || !value?.trim()) return;
    onSubmit?.(value);
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 입력값 변경 핸들러
  const handleChange = e => {
    onChange?.(e);
  };

  // 크기별 스타일
  const sizeStyles = {
    sm: {
      container: 'h-10',
      input: 'text-sm px-3',
      icon: 20,
    },
    md: {
      container: 'h-12',
      input: 'text-base px-4',
      icon: 24,
    },
    lg: {
      container: 'h-14',
      input: 'text-lg px-5',
      icon: 28,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      className={`search-container relative ${currentSize.container} ${className} `}
    >
      <div
        className={`search-wrapper relative flex h-full w-full items-center border-1 border-white bg-gray-500 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text'} `}
        onClick={() => !disabled && ref?.current?.focus()}
      >
        {/* 검색 입력 필드 */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className={`search-input h-full w-full flex-1 bg-transparent ${currentSize.input} ${showSearchIcon ? 'p-0' : 'p-4'} text-white outline-none placeholder:text-gray-300 disabled:cursor-not-allowed`}
          {...restProps}
        />

        {/* 검색 아이콘 */}
        {showSearchIcon && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || !value?.trim()}
            aria-label="검색"
            className="search-icon-button flex flex-shrink-0 items-center justify-center pr-2 pl-4 transition-opacity duration-200 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Image
              src="/assets/icons/ic_search.svg"
              alt="검색"
              width={currentSize.icon}
              height={currentSize.icon}
              className="pointer-events-none"
            />
          </button>
        )}
      </div>
    </div>
  );
}
