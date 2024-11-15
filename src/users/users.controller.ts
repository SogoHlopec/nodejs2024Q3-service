import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): UserResponseDto {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): UserResponseDto[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserResponseDto {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePasswordDto: UpdatePasswordDto,
  ): UserResponseDto {
    return this.usersService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
