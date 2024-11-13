import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  create(login: string, password: string): User {
    const newUser = new User(login, password);
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, newPassword: string): User {
    const user = this.getById(id);
    user.updatePassword(newPassword);
    return user;
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
