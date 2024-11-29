import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logLevels = ['log', 'warn', 'error', 'debug', 'verbose'];

  private isLevelEnabled(level: string): boolean {
    const appLogLevel = process.env.LOG_LEVEL || 'log';
    const currentLevelIndex = this.logLevels.indexOf(level.toLowerCase());
    const appLevelIndex = this.logLevels.indexOf(appLogLevel.toLowerCase());
    return currentLevelIndex <= appLevelIndex;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `${timestamp} [${level}]: ${message}`;
  }

  log(message: string): void {
    if (this.isLevelEnabled('log')) {
      console.log(this.formatMessage('LOG', message));
    }
  }

  warn(message: string): void {
    if (this.isLevelEnabled('warn')) {
      console.warn(this.formatMessage('WARN', message));
    }
  }

  error(message: string, trace?: string): void {
    if (this.isLevelEnabled('error')) {
      console.error(this.formatMessage('ERROR', message));
      if (trace) {
        console.error(`[TRACE]: ${trace}`);
      }
    }
  }

  debug(message: string): void {
    if (this.isLevelEnabled('debug')) {
      console.debug(this.formatMessage('DEBUG', message));
    }
  }

  verbose(message: string): void {
    if (this.isLevelEnabled('verbose')) {
      console.log(this.formatMessage('VERBOSE', message));
    }
  }
}
