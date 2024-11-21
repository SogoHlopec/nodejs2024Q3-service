import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbUserRepository } from './repositories/db-user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DbUserRepository],
})
export class UsersModule {}
