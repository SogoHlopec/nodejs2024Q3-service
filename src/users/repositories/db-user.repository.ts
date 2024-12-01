import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    if (user) {
      return {
        id: user.id,
        password: user.password,
        login: user.login,
        version: user.version,
        createdAt: Date.parse(String(user.createdAt)),
        updatedAt: Date.parse(String(user.updatedAt)),
      };
    }
  }

  async create(createUserDto: CreateUserDto): Promise<DbUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: hashedPassword,
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
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        version: { increment: 1 },
      },
    });
    if (user) {
      const updatedUser = await this.prisma.user.findUnique({
        where: { id },
      });

      return {
        id: updatedUser.id,
        password: updatedUser.password,
        login: updatedUser.login,
        version: updatedUser.version,
        createdAt: Date.parse(String(updatedUser.createdAt)),
        updatedAt: Date.parse(String(updatedUser.updatedAt)) + 1,
      };
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      await this.prisma.user.delete({
        where: { id },
      });
    }
  }

  async findByLogin(login: string): Promise<DbUser> {
    const user = await this.prisma.user.findUnique({
      where: { login },
    });
    if (user) {
      return {
        id: user.id,
        password: user.password,
        login: user.login,
        version: user.version,
        createdAt: Date.parse(String(user.createdAt)),
        updatedAt: Date.parse(String(user.updatedAt)),
      };
    }
  }
}
