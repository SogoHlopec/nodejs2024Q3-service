import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validateUuid } from './utils/uuid-validator.util';
import { DbUserRepository } from './repositories/db-user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: DbUserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.create(createUserDto);
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getAll();
    return users.map((user) => {
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    const userUpdate = await this.userRepository.update(id, updatePasswordDto);
    return {
      id: userUpdate.id,
      login: userUpdate.login,
      version: userUpdate.version,
      createdAt: userUpdate.createdAt,
      updatedAt: userUpdate.updatedAt,
    };
  }

  async remove(id: string) {
    if (!validateUuid(id)) {
      throw new BadRequestException('Id is invalid');
    }
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findByLogin(login);
    if (!user) {
      return false;
    }
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
