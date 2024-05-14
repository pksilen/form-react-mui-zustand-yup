import { FieldPath, useForm } from 'react-hook-form';
import { ErrorAlert } from 'app/common/components/stateless/alerts/ErrorAlert';
import { SubmitButton } from 'app/common/components/stateless/buttons/SubmitButton';
import { TextInput, TextInputProps } from 'app/common/components/stateless/input/TextInput';
import { createControlledFormInput } from 'app/common/components/stateless/input/factories/createControlledFormInput';
import { useUserStore } from 'app/stores/userStore';
import classes from './UserRegistrationForm.module.scss';
import { UserSchema, defaultValues, resolver } from './userSchema';

const ControlledFormTextInput = createControlledFormInput<TextInputProps, UserSchema>(TextInput, {
  maxLength: 128,
  required: !window.location.href.includes('test')
});

export const UserRegistrationForm = () => {
  const error = useUserStore((store) => store.error);
  const { registerUser } = useUserStore((store) => store.actions);

  const {
    control: formControl,
    formState: { errors: formErrors },
    handleSubmit,
    reset: resetForm
  } = useForm<UserSchema>({ defaultValues, resolver });

  const handleUserRegistration = handleSubmit(async (user) => {
    if (await registerUser(user)) {
      resetForm();
    }
  });

  const createTextInput = (formFieldName: FieldPath<UserSchema>) => (
    <ControlledFormTextInput
      formControl={formControl}
      formErrors={formErrors}
      formFieldName={formFieldName}
    />
  );

  return (
    <form className={classes.form} onSubmit={handleUserRegistration}>
      <fieldset className={classes.inlineFields}>
        {createTextInput('firstName')}
        {createTextInput('lastName')}
      </fieldset>
      {createTextInput('streetAddress')}
      <fieldset className={classes.inlineFields}>
        {createTextInput('zipCode')}
        {createTextInput('city')}
      </fieldset>
      {createTextInput('email')}
      {createTextInput('phoneNumber')}
      <SubmitButton>Register</SubmitButton>
      {error && <ErrorAlert>Registration failed. Please try again.</ErrorAlert>}
    </form>
  );
};
