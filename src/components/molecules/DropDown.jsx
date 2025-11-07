import Image from 'next/image';
import { useState, useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

// 드롭다운 컴포넌트
export default function DropDown({
  options = [
    { label: '김치', value: 'kimchi' },
    { label: '찌개', value: 'soup' },
    { label: '먹고', value: 'eat' },
    { label: '싶다', value: 'do' },
  ], // 리스트 옵션들
  value, // 현재값
  onChange, // 값 변경 핸들러
  placeholder = '선택해주세요', // 표기값
  fontSize = 'text-base', // 폰트 크기 ()
  type = 'default', // 드롭다운 타입 (default, filter)
  openFilter, // 필터 열기 함수 (아직 업데이트 안됨)
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = option => {
    onChange(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex w-fit items-center justify-center text-left"
    >
      {/* 드롭다운 버튼 */}
      {type === 'filter' ? (
        <div
          className="flex h-[35px] w-[35px] items-center justify-center rounded-[2px] border-[1px] border-white"
          onClick={openFilter}
        >
          <Image
            src="/assets/icons/ic_filter.svg"
            alt="필터 아이콘"
            width={20}
            height={20}
          />
        </div>
      ) : (
        <button
          type="button"
          className={`flex flex-row items-center justify-center rounded-lg px-4 py-3 text-left font-bold text-white transition-all duration-200 ${fontSize}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block">
            {selectedOption?.label ? selectedOption?.label : placeholder}
          </span>
          <Image
            src="/assets/icons/ic_down.svg"
            alt="드롭다운 아이콘"
            width={20}
            height={20}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      )}

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-[100%] right-0 z-50 overflow-hidden rounded-[2px] border border-white bg-[var(--color-black)] text-white shadow-lg">
          {options.map((option, index) => {
            return (
              <button
                key={option.value || index}
                type="button"
                className={`flex w-full items-center px-4 py-3 text-left transition-colors duration-150 hover:bg-[var(--color-gray-400)] ${option === selectedOption ? 'bg-[var(--color-gray-400)]' : ''} `}
                onClick={() => handleSelect(option)}
              >
                <span className="block truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
