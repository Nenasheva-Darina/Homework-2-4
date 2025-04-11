import { useState } from 'react';
import { EmailValidationLayout } from './EmailValidationLayout';

export const EmailValidationContainer = ({
  register,
  errors,
  onValueChange,
}) => {
  const [hint, setHint] = useState('');

  const requirements =
    'Пожалуйста, введите корректный email, соответствующий требованиям: \n \n ✓ Обязательно содержит символ @ и домен (например, example.com) \n ✓ Минимум 3 символа до знака @ \n ✓ Максимум 20 символов до знака @\n ✓ Может содержать точки между символами (ivan.petrov@mail.ru) \n ✗ Не может: \n - Начинаться или заканчиваться точкой \n - Содержать пробелы \n - Иметь две точки подряд. \n\n Пример правильного email: your.name123@service.com\n\n';

  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <EmailValidationLayout
      register={register}
      errors={errors}
      hint={hint}
      onFocus={() => setHint(requirements)}
      onBlur={() => setHint('')}
      onChange={handleChange}
    />
  );
};
