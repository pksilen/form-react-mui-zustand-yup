import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorAlert } from '../../common/components/presentational/alerts/ErrorAlert';
import { SubmitButton } from '../../common/components/presentational/buttons/SubmitButton';
import { createControlledFormInput } from '../../common/components/presentational/factories/createControlledFormInput';
import { TextInput, TextInputProps } from '../../common/components/presentational/input/TextInput';
import { useUserStore } from '../../stores/userStore';
import classes from './UserRegistration.module.scss';
import { defaultValues, resolver, UserSchema } from './userSchema';

const ControlledFormTextInput = createControlledFormInput<TextInputProps, UserSchema>(TextInput, {
  classes: classes.textInput,
  required: true
});

export const UserRegistration = () => {
  const error = useUserStore((store) => store.error);
  const createUser = useUserStore((store) => store.actions.createUser);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<UserSchema>({ defaultValues, resolver });

  const onSubmit: SubmitHandler<UserSchema> = async (user) => {
    const didSucceed = await createUser(user);

    if (didSucceed) {
      reset();
    }
  };

  const createTextInput = (name: FieldPath<UserSchema>) => (
    <ControlledFormTextInput control={control} errors={errors} name={name} />
  );

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.inline}>
        {createTextInput('firstName')}
        {createTextInput('lastName')}
      </fieldset>
      {createTextInput('streetAddress')}
      <fieldset className={classes.inline}>
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
