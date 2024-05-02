import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useUserStore from '../../stores/userStore';
import classNames from './UserRegistration.module.scss';

const userSchema = yup
  .object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    streetAddress: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    zipCode: yup.string().required('Zip code is required'),
    email: yup.string().email().required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required')
  })
  .required();

export type InputUser = yup.InferType<typeof userSchema>;

export default function UserRegistration() {
  const error = useUserStore((store) => store.error);
  const createUser = useUserStore((store) => store.actions.createUser);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<InputUser>({
    defaultValues: {
      firstName: '',
      lastName: '',
      streetAddress: '',
      zipCode: '',
      city: '',
      email: '',
      phoneNumber: ''
    },
    resolver: yupResolver(userSchema)
  });

  const onSubmit: SubmitHandler<InputUser> = async (inputUser) => {
    const didSucceed = await createUser(inputUser);

    if (didSucceed) {
      reset();
    }
  };

  return (
    <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextField
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              inputProps={{ maxLength: 64 }}
              label="First name"
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              inputProps={{ maxLength: 64 }}
              label="Last Name"
              margin="normal"
              {...field}
            />
          )}
        />
      </fieldset>
      <Controller
        control={control}
        name="streetAddress"
        render={({ field }) => (
          <TextField
            error={!!errors.streetAddress}
            helperText={errors?.streetAddress?.message}
            inputProps={{ maxLength: 128 }}
            label="Street Address"
            margin="normal"
            {...field}
          />
        )}
      />
      <fieldset>
        <Controller
          control={control}
          name="zipCode"
          render={({ field }) => (
            <TextField
              error={!!errors.zipCode}
              helperText={errors?.zipCode?.message}
              inputProps={{ maxLength: 5 }}
              label="Zip Code"
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <TextField
              className={classNames.textField}
              error={!!errors.city}
              helperText={errors?.city?.message}
              inputProps={{ maxLength: 64 }}
              label="City"
              margin="normal"
              {...field}
            />
          )}
        />
      </fieldset>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            className={classNames.textField}
            error={!!errors.email}
            helperText={errors?.email?.message}
            inputProps={{ maxLength: 128 }}
            label="Email"
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            inputProps={{ maxLength: 16 }}
            label="Phone Number"
            margin="normal"
            {...field}
          />
        )}
      />
      <Button size="large" sx={{ marginTop: '20px' }} type="submit" variant="contained">
        Register
      </Button>
      {error && <Alert severity="error">Registration failed. Please try again.</Alert>}
    </form>
  );
}
