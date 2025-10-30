'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/components/Input.module.css';

export default function Input({
  label,
  type = 'text',
  id,
  placeholder,
  value,
  onChange,
  size = 'md',
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const isPrice = type === 'number';

  const validate = val => {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) setError('이메일 형식이 아닙니다.');
      else setError('');
    } else if (type === 'password' && id === 'confirm') {
      const passwordEl = document.getElementById('password');
      if (passwordEl && passwordEl.value !== val)
        setError('비밀번호가 일치하지 않습니다.');
      else setError('');
    } else if (type === 'text' && id === 'title') {
      if (val.length > 30)
        setError('포토카드 이름은 최대 30자까지 입력 가능합니다.');
      else setError('');
    } else setError('');
  };

  const handleChange = e => {
    const val = e.target.value;
    onChange(e);
    validate(val);
  };

  const sizeClasses = {
    lg: '!w-[520px] max-w-full text-base',
    md: '!w-[440px] max-w-full text-sm',
    sm: '!w-[345px] max-w-full text-sm',
    xs: '!w-[245px] max-w-full text-sm',
  };

  return (
    <div className={`${styles.inputGroup} ${sizeClasses[size]}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`${styles.input} ${error ? styles.error : ''}`}
          required
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            <Image
              src={
                showPassword
                  ? '/assets/icons/ic_visible.svg'
                  : '/assets/icons/ic_invisible.svg'
              }
              alt="toggle password"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
        )}
        {isPrice && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xl font-bold text-white">
            P
          </div>
        )}
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}

// export default function Input({
//   name = '',
//   value,
//   onChange,
//   label = '',
//   error = '',
//   placeholder = '',
//   ...props
// }) {
//   return (
//     <div className={styles.inputGroup}>
//       <div className="flex w-[100%] flex-col gap-[10px]">
//         {label && (
//           <label htmlFor={name} className={styles.label}>
//             {label}
//           </label>
//         )}
//         <input
//           className={`${styles.input} ${error ? styles.error : ''}`}
//           {...props}
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//         />
//       </div>
//       {error && <span className={styles.errorMsg}>{error}</span>}
//     </div>
//   );
// }
