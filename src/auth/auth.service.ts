import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { generateAccessToken, generateRefreshToken } from './utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const login = createUserDto.login;
    const password = createUserDto.password;
    const existingUser = await this.usersService.findByLogin(login);
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    await this.usersService.create({
      login,
      password,
    });

    return { message: 'User successfully created' };
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
}
