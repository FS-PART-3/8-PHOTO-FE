import styles from './Input.module.css';

export default function Input({
  label = '',
  name = '',
  value = null,
  onChange = null,
  error = '',
  placeholder = '',
  ...props
}) {
  return (
    <div className={styles.inputGroup}>
      <div className="flex w-[100%] flex-col gap-[10px]">
        {label && <label className={styles.label}>{label}</label>}
        <input
          className={`${styles.input} ${error ? styles.error : ''}`}
          // value={value}
          // onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
