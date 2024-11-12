import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryUserRepository],
})
export class UsersModule {}
