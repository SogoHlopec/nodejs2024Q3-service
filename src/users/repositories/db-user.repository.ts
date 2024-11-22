import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { DbUser } from '../entities/user.entity';
import { IDbUserRepository } from './db-user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-user.dto';

@Injectable()
export class DbUserRepository implements IDbUserRepository {
  constructor(private readonly prisma: DbService) {}

  async getAll(): Promise<DbUser[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return {
        id: user.id,
        password: user.password,
        login: user.login,
        version: user.version,
        createdAt: Date.parse(String(user.createdAt)),
        updatedAt: Date.parse(String(user.updatedAt)),
      };
    });
  }

  async getById(id: string): Promise<DbUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return {
      id: user.id,
      password: user.password,
      login: user.login,
      version: user.version,
      createdAt: Date.parse(String(user.createdAt)),
      updatedAt: Date.parse(String(user.updatedAt)),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<DbUser> {
    const newUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
      },
    });
    return {
      id: newUser.id,
      password: newUser.password,
      login: newUser.login,
      version: newUser.version,
      createdAt: Date.parse(String(newUser.createdAt)),
      updatedAt: Date.parse(String(newUser.updatedAt)),
    };
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<DbUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: { increment: 1 },
      },
    });
    return {
      id: user.id,
      password: user.password,
      login: user.login,
      version: user.version,
      createdAt: Date.parse(String(user.createdAt)),
      updatedAt: Date.parse(String(user.updatedAt)),
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
