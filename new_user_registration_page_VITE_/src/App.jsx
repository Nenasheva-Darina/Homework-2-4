import { useRegistration } from './userRegistration.jsx';
import './index.css';
import { useState, useRef, useEffect } from 'react';
import styles from './App.module.css';
import { EmailValidationContainer } from './EmailValidation/EmailValidationContainer.jsx';

const sendFormData = (formData) => {
  console.log('formData', formData);
};

export const App = () => {
  const { getState, updateState, resetState } = useRegistration();
  const { email, password, repeatPassword } = getState();
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const buttonRef = useRef(null);

  const validateForm = () => {
    let isValid = true;

    if (password !== repeatPassword) {
      setErrorPassword('Пароли не совпадают!');
      isValid = false;
    } else {
      setErrorPassword(null);
    }

    return isValid;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      sendFormData(getState());
      resetState();
      setErrorEmail(null);
      setErrorPassword(null);
    }
  };

  useEffect(() => {
    const isFormValid =
      email &&
      email.length > 0 &&
      password &&
      password.length > 0 &&
      repeatPassword &&
      repeatPassword.length > 0 &&
      password === repeatPassword &&
      !errorEmail &&
      !errorPassword;

    if (isFormValid && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [email, password, repeatPassword, errorEmail, errorPassword]);

  return (
    <>
      <form onSubmit={onSubmit}>
        {errorPassword && (
          <div className={styles.errorBlock}>{errorPassword}</div>
        )}
        <EmailValidationContainer
          setErrorEmail={setErrorEmail}
          value={email}
          onChange={(value) => updateState('email', value)}
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => updateState('password', target.value)}
        />
        <input
          className={styles.input}
          type="password"
          name="repeatPassword"
          placeholder="Повтор пароля"
          value={repeatPassword}
          onChange={({ target }) => updateState('repeatPassword', target.value)}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={errorEmail || errorPassword}
          ref={buttonRef}
        >
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

export default App;
