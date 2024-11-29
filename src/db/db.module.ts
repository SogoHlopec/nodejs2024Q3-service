import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  imports: [LoggingModule],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
