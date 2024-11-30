import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class LoggingService {
  private readonly logLevels = ['log', 'warn', 'error', 'debug', 'verbose'];
  private logFilePath: string;
  private maxFileSizeKb: number;

  constructor() {
    this.logFilePath = path.resolve(__dirname, '../../logs/application.log');
    this.maxFileSizeKb = Number(process.env.LOG_FILE_MAX_SIZE_KB) || 1024;
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

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

  private rotateLogFile(): void {
    try {
      if (fs.existsSync(this.logFilePath)) {
        const stats = fs.statSync(this.logFilePath);
        const fileSizeInKb = stats.size / 1024;
        if (fileSizeInKb > this.maxFileSizeKb) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const rotatedFilePath = `${this.logFilePath}.${timestamp}`;
          fs.renameSync(this.logFilePath, rotatedFilePath);
        }
      }
    } catch (err) {
      console.error('[ERROR] Failed to rotate log file:', err);
    }
  }

  private writeToFile(logMessage: string): void {
    this.rotateLogFile();
    fs.appendFile(this.logFilePath, logMessage + '\n', (err) => {
      if (err) {
        console.error('[ERROR] Failed to write to log file:', err);
      }
    });
  }

  log(message: string): void {
    if (this.isLevelEnabled('log')) {
      const logMessage = this.formatMessage('LOG', message);
      console.log(logMessage);
      this.writeToFile(logMessage);
    }
  }

  warn(message: string): void {
    if (this.isLevelEnabled('warn')) {
      const logMessage = this.formatMessage('WARN', message);
      console.warn(logMessage);
      this.writeToFile(logMessage);
    }
  }

  error(message: string, trace?: string): void {
    if (this.isLevelEnabled('error')) {
      const logMessage = this.formatMessage('ERROR', message);
      console.error(logMessage);
      this.writeToFile(logMessage);

      if (trace) {
        const traceMessage = `[TRACE]: ${trace}`;
        console.error(traceMessage);
        this.writeToFile(traceMessage);
      }
    }
  }

  debug(message: string): void {
    if (this.isLevelEnabled('debug')) {
      const logMessage = this.formatMessage('DEBUG', message);
      console.debug(logMessage);
      this.writeToFile(logMessage);
    }
  }

  verbose(message: string): void {
    if (this.isLevelEnabled('verbose')) {
      const logMessage = this.formatMessage('VERBOSE', message);
      console.log(logMessage);
      this.writeToFile(logMessage);
    }
  }
}
