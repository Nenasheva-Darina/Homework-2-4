import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationSchema } from './Schemes.Yup';
import { EmailValidationContainer } from './EmailValidation/EmailValidationContainer';
import styles from './App.module.css';
import { useEffect, useRef, useState } from 'react';

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(RegistrationSchema),
    mode: 'onChange',
  });

  const buttonRef = useRef(null);
  const [passwordHint, setPasswordHint] = useState(false);

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
    reset();
  };

  useEffect(() => {
    if (isValid && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isValid]);

  const handleEmailChange = (value) => {
    setValue('email', value);
    trigger('email');
  };
  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailValidationContainer
          register={register}
          errors={errors}
          onValueChange={handleEmailChange}
        />

        <div className={styles.field}>
          <input
            type="password"
            {...register('password')}
            placeholder="Пароль"
            className={styles.input}
            onFocus={() => setPasswordHint(true)}
            onBlur={() => setPasswordHint(false)}
          />
          {passwordHint && (
            <div className={styles.hint}>Минимум 6 символов</div>
          )}
          {errors.password && (
            <div className={styles.errorBlock}>{errors.password.message}</div>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="password"
            {...register('repeatPassword')}
            placeholder="Повторите пароль"
            className={styles.input}
          />
          {errors.repeatPassword && (
            <div className={styles.errorBlock}>
              {errors.repeatPassword.message}
            </div>
          )}
        </div>

        <div className={styles.buttons}>
          <button
            ref={buttonRef}
            type="submit"
            className={styles.button}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => reset()}
          >
            Сброс
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
