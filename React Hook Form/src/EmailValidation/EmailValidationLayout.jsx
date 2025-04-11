import styles from './EmailValidation.module.css';

export const EmailValidationLayout = ({
  register,
  errors,
  hint,
  onFocus,
  onBlur,
  onChange,
}) => {
  return (
    <div className={styles.field}>
      <input
        type="email"
        {...register('email')}
        className={styles.input}
        placeholder="Email"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {hint && <div className={styles.hint}>{hint}</div>}
      {errors.email && (
        <div className={styles.errorBlock}>{errors.email.message}</div>
      )}
    </div>
  );
};
