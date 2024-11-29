import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'js-yaml';
import {} from 'node:fs';
import * as fs from 'node:fs/promises';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './logging/all-exceptions.filter';

dotenv.config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  const swaggerDocument = yaml.load(
    await fs.readFile(join(__dirname, '../..', 'doc', 'api.yaml'), 'utf8'),
  );
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.useGlobalFilters(new AllExceptionsFilter(loggingService));

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception detected', error.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    loggingService.error(
      'Unhandled Rejection detected',
      reason?.stack || reason,
    );
  });

  await app.listen(PORT, () => {
    loggingService.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
