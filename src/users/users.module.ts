import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbUserRepository } from './repositories/db-user.repository';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService, DbUserRepository],
  exports: [UsersService],
})
export class UsersModule {}
