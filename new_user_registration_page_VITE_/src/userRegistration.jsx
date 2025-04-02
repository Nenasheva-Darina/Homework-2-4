import { useState } from 'react';

const initialState = {
  email: '',
  password: '',
  repeatPassword: '',
};

export const useRegistration = () => {
  const [state, setState] = useState(initialState);

  // console.log('initialState', initialState);

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue });
    },
    resetState() {
      setState(initialState);
    },
  };
};
