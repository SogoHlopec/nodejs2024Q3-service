import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { validateUuid } from './utils/uuid-validator.util';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  create(createUserDto: CreateUserDto): UserResponseDto {
    const user = this.userRepository.create(
      createUserDto.login,
      createUserDto.password,
    );
    return user.toResponse();
  }

  findAll(): UserResponseDto[] {
    const users = this.userRepository.getAll();
    return users.map((user) => user.toResponse());
  }

  findOne(id: string): UserResponseDto {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const user = this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toResponse();
  }

  update(id: string, UpdatePasswordDto: UpdatePasswordDto): UserResponseDto {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const user = this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== UpdatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    const userUpdate = this.userRepository.update(
      id,
      UpdatePasswordDto.newPassword,
    );
    return userUpdate.toResponse();
  }

  remove(id: string) {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const user = this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userRepository.delete(id);
  }
}
