import { UsersInterface } from 'src/interfaces/interfaces';
import * as yup from 'yup';

export const signUpSchema = yup.object({
  email: yup.string().required('Email shouldn`t be empty').email().trim(),
  password: yup
    .string()
    .required('Password shouldn`t be empty')
    .min(5, 'password must be at least 5 characters long')
    .max(12, 'password must be less than 12 characters long'),
  passwordToCompare: yup
    .string()
    .required("Password is required")
    .test('password-match', 'Passwords do not match', function() {
      return this.parent.password === this.parent.passwordToCompare;
    })
});

export const signInSchema: yup.ObjectSchema<Omit<UsersInterface, 'name'>> = yup.object({
  email: yup.string().required('Email shouldn`t be empty').email().trim(),
  password: yup
    .string()
    .required('Password shouldn`t be empty')
    .min(5, 'password must be at least 5 characters long')
    .max(12, 'password must be less than 12 characters long'),
});
