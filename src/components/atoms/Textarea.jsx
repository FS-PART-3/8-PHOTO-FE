'use client';

import { useState } from 'react';
import styles from '@/styles/components/Input.module.css';

export default function Textarea({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  size = 'md',
}) {
  const [error, setError] = useState('');

  const sizeClasses = {
    lg: '!w-[520px] !h-[180px] max-w-full text-base',
    md: '!w-[440px] !h-[140px] max-w-full text-sm',
    sm: '!w-[345px] !h-[140px] max-w-full text-sm',
  };

  return (
    <div className={`${styles.inputGroup} ${sizeClasses[size]}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={`${styles.input} ${sizeClasses[size]} ${error ? styles.error : ''}`}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
