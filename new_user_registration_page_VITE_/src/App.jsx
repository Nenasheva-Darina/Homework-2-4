import { useStorageForRegistration } from './useStorageForRegistration.jsx';
import './index.css';
import { useRef, useEffect } from 'react';
import styles from './App.module.css';
import { EmailValidationContainer } from './EmailValidation/EmailValidationContainer.jsx';

const sendFormData = (formData) => {
  console.log('formData', formData);
};

export const App = () => {
  const {
    getState,
    updateState,
    resetState,
    validatePassword,
    setEmailError,
    errors,
  } = useStorageForRegistration(); // 1

  const { email, password, repeatPassword } = getState(); // 2

  //Фокус
  const buttonRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const onChange = ({ target }) => updateState(target.name, target.value);

  const onSubmit = (event) => {
    event.preventDefault();

    const isPasswordValid = validatePassword();

    if (!errors.email && isPasswordValid) {
      sendFormData(getState());
      resetState();
    }
  };

  const isButtonDisabled =
    errors.email || errors.password || errors.repeatPassword;

  useEffect(() => {
    const isFormValid =
      email &&
      password &&
      repeatPassword &&
      password === repeatPassword &&
      !errors.email &&
      !errors.password &&
      !errors.repeatPassword;

    if (isFormValid && buttonRef.current) {
      buttonRef.current.focus();
    }
    if (errors.repeatPassword) {
      repeatPasswordRef.current?.focus();
    }
  }, [email, password, repeatPassword, errors]);

  return (
    <>
      <form onSubmit={onSubmit}>
        {errors.password ||
          (errors.repeatPassword && (
            <div className={styles.errorBlock}>
              {errors.password}
              {errors.repeatPassword}
            </div>
          ))}
        <EmailValidationContainer
          setErrorEmail={setEmailError}
          value={email}
          error={errors.email}
          onChange={(value) => updateState('email', value)}
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={onChange}
        />
        <input
          className={styles.input}
          type="password"
          name="repeatPassword"
          placeholder="Повтор пароля"
          value={repeatPassword}
          onChange={onChange}
          ref={repeatPasswordRef}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={isButtonDisabled}
          ref={buttonRef}
        >
          Зарегистрироваться
        </button>

        <button type="button" className={styles.button} onClick={resetState}>
          Сброс
        </button>
      </form>
    </>
  );
};

export default App;
