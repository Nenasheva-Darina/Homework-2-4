import { useState } from 'react';

const initialState = {
  email: '',
  password: '',
  repeatPassword: '',
};

export const useStorageForRegistration = () => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    repeatPassword: null,
  });

  const getState = () => state;
  const getErrors = () => errors;

  const updateState = (fieldName, newValue) => {
    setState({ ...state, [fieldName]: newValue });
    setErrors({ ...errors, [fieldName]: null });
  };

  const setEmailError = (error) => {
    setErrors({ ...errors, email: error });
  };

  const validatePassword = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!state.password) {
      newErrors.password = 'Заполните пароль';
      isValid = false;
    } else {
      newErrors.password = null;
    }

    if (state.password !== state.repeatPassword) {
      newErrors.repeatPassword = 'Пароли не совпадают';
      isValid = false;
    } else {
      newErrors.repeatPassword = null;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetState = () => {
    setState(initialState);
    setErrors({ email: null, password: null, repeatPassword: null });
  };

  return {
    getState,
    getErrors,
    updateState,
    setEmailError,
    validatePassword,
    resetState,
    errors,
  };
};
