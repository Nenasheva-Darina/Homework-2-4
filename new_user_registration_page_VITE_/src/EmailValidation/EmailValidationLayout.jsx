import styles from './EmailValidation.module.css';

export const EmailValidationLayout = ({
  isEmailTouched,
  value,
  onChange,
  error,
  onFocus,
  onBlur,
  hint,
}) => {
  return (
    <>
      <div>
        {isEmailTouched && error && (
          <div className={styles.errorBlock}>{error}</div>
        )}
        {hint && <div className={styles.hint}>{hint}</div>}
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </>
  );
};
