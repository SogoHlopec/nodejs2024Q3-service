import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-user.dto';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = new User(createUserDto.login, createUserDto.password);
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.getById(id);
    user.updatePassword(updatePasswordDto.newPassword);
    return user;
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
