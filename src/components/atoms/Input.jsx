'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/components/Input.module.css';

export default function Input({
  label,
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  error = '',
  size = 'md',
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const isPrice = type === 'number';

  const sizeClasses = {
    lg: '!w-[520px] max-w-full text-base',
    md: '!w-[440px] max-w-full text-sm',
    sm: '!w-[345px] max-w-full text-sm',
    xs: '!w-[245px] max-w-full text-sm',
  };

  return (
    <div className={`${styles.inputGroup} ${sizeClasses[size]}`}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          id={id || name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.error : ''}`}
          required
        />

        {type === 'password' && (
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
