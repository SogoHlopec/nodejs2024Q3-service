import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class DbService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly loggingService: LoggingService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.loggingService.log(`Connected to database `);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
