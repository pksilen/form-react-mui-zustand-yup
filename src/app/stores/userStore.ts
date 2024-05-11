import { create } from 'zustand';
import { UserSchema } from '../components/userregistrationform/userSchema';
import { userService } from '../services/FakeUserService';
import { User } from './User';

type State = {
  error: Error | null;
  users: User[];
};

type Actions = {
  registerUser: (user: UserSchema) => Promise<boolean>;
  fetchUsers: () => Promise<void>;
};

type UserStore = State & { actions: Actions };

export const useUserStore = create<UserStore>()((setState, getState) => ({
  error: null,
  users: [],

  actions: {
    registerUser: async (user: UserSchema) => {
      let registeredUser: User | undefined;

      try {
        registeredUser = await userService.registerUser(user);
        setState({ error: null, users: [...getState().users, registeredUser] });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setState({ error });
      }

      return !!registeredUser;
    },

    fetchUsers: async () => {
      const users = await userService.getUsers();
      setState({ users });
    }
  }
}));
