import { useEffect } from 'react';

/**
 * 외부 클릭 감지 훅
 * @param {React.RefObject} ref - 감지할 요소의 ref
 * @param {Function} callback - 외부 클릭 시 실행할 콜백 함수
 */
export default function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
