import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersService.create({
      login,
      password: hashedPassword,
    });

    return { message: 'User successfully created' };
  }
}
