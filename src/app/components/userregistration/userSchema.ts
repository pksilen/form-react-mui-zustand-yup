import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const userSchema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    streetAddress: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    zipCode: yup.string().required('Zip code is required'),
    email: yup.string().email('Email is not valid').required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required')
  })
  .required();

export const defaultValues = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  zipCode: '',
  city: '',
  email: '',
  phoneNumber: ''
};

export const resolver = yupResolver(userSchema);
export type UserSchema = yup.InferType<typeof userSchema>;
