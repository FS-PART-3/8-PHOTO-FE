'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Input({
  label,
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  error = null,
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
    <div
      className={`flex h-fit w-full flex-col gap-[6px] ${sizeClasses[size]}`}
    >
      {label && (
        <label
          htmlFor={id || name}
          className="text-[16px] font-normal text-[#fff]"
        >
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
          className={`h-[55px] w-full rounded-[2px] border-1 bg-[#0f0f0f] px-[20px] py-[18px] text-[#fff] ${error ? 'border-[#c41013] focus:border-[#ffa3a5]' : 'border-[#ddd] focus:border-[#fff]'}`}
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
      {error !== null && (
        <div className="flex h-[34px] w-full items-start">
          {error && (
            <span className="texet-[14px] font-normal text-[#c41013]">
              {error}
            </span>
          )}
        </div>
      )}
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
//       <div className="flex w-full flex-col gap-[10px]">
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
