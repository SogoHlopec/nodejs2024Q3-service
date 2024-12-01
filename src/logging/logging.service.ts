import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class LoggingService {
  private readonly logLevels = ['log', 'warn', 'error', 'debug', 'verbose'];
  private logFilePath: string;
  private errorLogFilePath: string;
  private maxFileSizeKb: number;

  constructor() {
    this.logFilePath = path.resolve(__dirname, '../../logs/application.log');
    this.errorLogFilePath = path.resolve(__dirname, '../../logs/errors.log');
    this.maxFileSizeKb = Number(process.env.LOG_FILE_MAX_SIZE_KB) || 1024;

    this.ensureLogFileExists(this.logFilePath);
    this.ensureLogFileExists(this.errorLogFilePath);
  }

  private ensureLogFileExists(filePath: string): void {
    const logFile = path.dirname(filePath);
    if (!fs.existsSync(logFile)) {
      fs.mkdirSync(logFile, { recursive: true });
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

  private rotateLogFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const fileSizeInKb = stats.size / 1024;
        if (fileSizeInKb > this.maxFileSizeKb) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const rotatedFilePath = `${filePath}.${timestamp}`;
          fs.renameSync(filePath, rotatedFilePath);
        }
      }
    } catch (err) {
      console.error('[ERROR] Failed to rotate log file:', err);
    }
  }

  private writeToFile(logMessage: string, filePath: string): void {
    this.rotateLogFile(filePath);
    fs.appendFile(filePath, logMessage + '\n', (err) => {
      if (err) {
        console.error('[ERROR] Failed to write to log file:', err);
      }
    });
  }

  log(message: string): void {
    if (this.isLevelEnabled('log')) {
      const logMessage = this.formatMessage('LOG', message);
      console.log(logMessage);
      this.writeToFile(logMessage, this.logFilePath);
    }
  }

  warn(message: string): void {
    if (this.isLevelEnabled('warn')) {
      const logMessage = this.formatMessage('WARN', message);
      console.warn(logMessage);
      this.writeToFile(logMessage, this.logFilePath);
    }
  }

  error(message: string, trace?: string): void {
    if (this.isLevelEnabled('error')) {
      const logMessage = this.formatMessage('ERROR', message);
      console.error(logMessage);
      this.writeToFile(logMessage, this.logFilePath);
      this.writeToFile(logMessage, this.errorLogFilePath);

      if (trace) {
        const traceMessage = `[TRACE]: ${trace}`;
        console.error(traceMessage);
        this.writeToFile(traceMessage, this.logFilePath);
        this.writeToFile(traceMessage, this.errorLogFilePath);
      }
    }
  }

  debug(message: string): void {
    if (this.isLevelEnabled('debug')) {
      const logMessage = this.formatMessage('DEBUG', message);
      console.debug(logMessage);
      this.writeToFile(logMessage, this.logFilePath);
    }
  }

  verbose(message: string): void {
    if (this.isLevelEnabled('verbose')) {
      const logMessage = this.formatMessage('VERBOSE', message);
      console.log(logMessage);
      this.writeToFile(logMessage, this.logFilePath);
    }
  }
}
