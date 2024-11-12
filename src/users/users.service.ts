import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(
      createUserDto.login,
      createUserDto.password,
    );
  }

  findAll(): User[] {
    return this.userRepository.getAll();
  }

  findOne(id: string): User {
    const user = this.userRepository.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new Error('Old password is wrong');
    }
    return this.userRepository.update(id, updateUserDto.newPassword);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
