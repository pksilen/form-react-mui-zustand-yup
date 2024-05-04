import { v4 as uuidv4 } from 'uuid';
import { UserSchema } from '../components/userregistration/userSchema';
import { User } from '../stores/User';
import { UserService } from './UserService';

class FakeUserService implements UserService {
  private readonly users: User[] = [];

  createUser(user: UserSchema): Promise<User> {
    const createdUser = { id: uuidv4(), ...user };

    if (Math.random() < 0.7) {
      this.users.push(createdUser);
      return Promise.resolve(createdUser);
    }

    return Promise.reject(new Error());
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}

export const userService = new FakeUserService();
