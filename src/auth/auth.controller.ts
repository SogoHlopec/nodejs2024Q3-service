import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(loginUserDto);
  }
}
