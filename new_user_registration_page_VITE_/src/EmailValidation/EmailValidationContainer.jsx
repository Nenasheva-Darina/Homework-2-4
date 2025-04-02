import { useState } from 'react';
import { EmailValidationLayout } from './EmailValidationLayout';

export const EmailValidationContainer = ({
  value,
  setErrorEmail,
  onChange,
}) => {
  const [error, setError] = useState(null);
  const [hint, setHint] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const requirementsEmail =
    'Пожалуйста, введите корректный email, соответствующий требованиям: \n \n ✓ Обязательно содержит символ @ и домен (например, example.com) \n ✓ Минимум 3 символа до знака @ \n ✓ Максимум 20 символов до знака @\n ✓ Может содержать точки между символами (ivan.petrov@mail.ru) \n ✗ Не может: \n - Начинаться или заканчиваться точкой \n - Содержать пробелы \n - Иметь две точки подряд. \n\n Пример правильного email: your.name123@service.com\n\n';

  const handleChange = (newValue) => {
    const [startEmail] = newValue.split('@');

    let newError = null;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if (newValue === '') {
      setError(null);
      setErrorEmail(null);
      onChange(newValue);
      return;
    }

    if (!newValue.includes('@')) {
      newError = 'Неверный email.Отсутствует @';
      setError(newError);
    } else if (startEmail.length > 20) {
      newError = 'Неверный email. Должно быть не больше 20 символов до @';
      setError(newError);
    } else if (startEmail.length < 3) {
      newError = 'Неверный email. Должно быть не меньше 3 символов до @';
      setError(newError);
    } else if (startEmail === '') {
      setError(null);
    }

    if (!emailRegex.test(newValue)) {
      newError = 'Неверный email. Изучи внимательно требования.';
      setError(newError);
    }

    setError(newError);
    setErrorEmail(newError);
    onChange(newValue);
  };

  const handleBlur = () => {
    setHint('');
    setIsEmailTouched(true);
  };

  return (
    <EmailValidationLayout
      isEmailTouched={isEmailTouched}
      value={value}
      onChange={handleChange}
      error={error}
      onFocus={() => setHint(requirementsEmail)}
      onBlur={handleBlur}
      hint={hint}
    />
  );
};
