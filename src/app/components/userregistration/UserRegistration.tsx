import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorAlert } from '../../common/components/stateless/alerts/ErrorAlert';
import { SubmitButton } from '../../common/components/stateless/buttons/SubmitButton';
import { createControlledFormInput } from '../../common/components/stateless/input/createControlledFormInput';
import {
  Props as TextInputProps,
  TextInput
} from '../../common/components/stateless/input/TextInput';
import { useUserStore } from '../../stores/userStore';
import classes from './UserRegistration.module.scss';
import { defaultValues, resolver, UserSchema } from './userSchema';

const ControlledFormTextInput = createControlledFormInput<TextInputProps, UserSchema>(TextInput, {
  maxLength: 128,
  required: true
});

export const UserRegistration = () => {
  const error = useUserStore((store) => store.error);
  const createUser = useUserStore((store) => store.actions.createUser);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm
  } = useForm<UserSchema>({ defaultValues, resolver });

  const onSubmit: SubmitHandler<UserSchema> = async (user) => {
    const userWasCreated = await createUser(user);

    if (userWasCreated) {
      resetForm();
    }
  };

  const createTextInput = (name: FieldPath<UserSchema>) => (
    <ControlledFormTextInput control={control} errors={errors} name={name} />
  );

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
      <SubmitButton className={classes.button}>Register</SubmitButton>
      {error && (
        <ErrorAlert className={classes.alert}>Registration failed. Please try again.</ErrorAlert>
      )}
    </form>
  );
};
