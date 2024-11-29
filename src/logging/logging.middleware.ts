import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const startTime = Date.now();
    const { method, url, query, body } = req;

    this.loggingService.log(
      `Incoming Request: ${method} ${url} | Query: ${JSON.stringify(
        query,
      )} | Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      this.loggingService.log(
        `Response: ${method} ${url} | Status Code: ${res.statusCode} | Duration: ${duration}ms`,
      );
    });

    next();
  }
}
