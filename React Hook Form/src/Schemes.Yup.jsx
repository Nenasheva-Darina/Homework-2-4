import * as yup from 'yup';

export const RegistrationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Поле обязательно для заполнения')
    .email('Неверный email. Отсутствует @ или неправильный формат')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      'Изучите внимательно требования.'
    )
    .max(20, 'Неверный email. Должно быть не больше 20 символов до @')
    .min(3, 'Неверный email. Должно быть не меньше 3 символов до @'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен быть не менее 6 символов'),
  repeatPassword: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

// export const validateAndGetErrorMessage = (scheme, value) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       login: '',
//     },
//     resolver: yupResolver(EmailChangeScheme),
//   });

//   let errorMessage = null;

//   return errorMessage;
// };
