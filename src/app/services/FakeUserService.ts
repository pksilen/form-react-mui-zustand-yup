import { v4 as uuidv4 } from 'uuid';
import { User } from '../stores/User';
import { InputUser } from '../views/userregistration/UserRegistration';
import { UserService } from './UserService';

class FakeUserService implements UserService {
  private readonly users: User[] = [];

  createUser(inputUser: InputUser): Promise<User> {
    const user = { id: uuidv4(), ...inputUser };

    if (Math.random() < 0.7) {
      this.users.push(user);
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error());
    }
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}

const userService = new FakeUserService();
export default userService;
