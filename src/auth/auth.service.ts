import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from './utils/jwt.util';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ id: string; message: string }> {
    const login = createUserDto.login;
    const password = createUserDto.password;
    const existingUser = await this.usersService.findByLogin(login);
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    const newUser = await this.usersService.create({
      login,
      password,
    });

    return { id: newUser.id, message: 'User successfully created' };
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const login = loginUserDto.login;
    const password = loginUserDto.password;

    const user = await this.usersService.findByLogin(login);
    if (!user) {
      throw new ForbiddenException('There is no user with this login');
    }

    const isPasswordValid = await this.usersService.checkPassword(
      login,
      password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect password');
    }

    const payload = { userId: user.id, login: user.login };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (!payload) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }

    const { userId, login } = payload as { userId: string; login: string };
    console.log('userId ' + userId);
    console.log('login ' + login);
    const newAccessToken = generateAccessToken({ userId, login });
    const newRefreshToken = generateRefreshToken({ userId, login });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
