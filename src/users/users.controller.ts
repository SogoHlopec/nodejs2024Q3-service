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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
