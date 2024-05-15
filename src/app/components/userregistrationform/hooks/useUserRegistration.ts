import { useForm } from 'react-hook-form';
import { useUserStore } from 'app/stores/userStore';
import { UserSchema, defaultValues, resolver } from '../userSchema';

export const useUserRegistration = () => {
  const error = useUserStore((store) => store.error);
  const { registerUser } = useUserStore((store) => store.actions);
  const form = useForm<UserSchema>({ defaultValues, resolver });

  const handleUserRegistration = form.handleSubmit(async (user) => {
    if (await registerUser(user)) {
      form.reset();
    }
  });

  return { error, form, handleUserRegistration };
};
