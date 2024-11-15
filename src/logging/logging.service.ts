import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
	private readonly logger: Logger;
	private readonly logLevel: string;
	private readonly maxFileSize: number;
	private readonly logFilePath: string;
	private readonly errorLogFilePath: string;

	constructor() {
		this.logLevel = process.env.LOG_LEVEL || 'log';
		this.maxFileSize =
			(parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024) * 1024;
		this.logFilePath = path.join(__dirname, 'application.log');
		this.errorLogFilePath = path.join(__dirname, 'error.log');
		this.logger = new Logger(LoggingService.name);

		process.on('uncaughtException', (error) => {
			this.logError('Uncaught Exception', error);
		});

		process.on('unhandledRejection', (reason) => {
			this.logError('Unhandled Rejection', reason);
		});
	}

	logRequest(url: string, query: any, body: any) {
		this.log(
			'log',
			`Request - URL: ${url}, Query: ${JSON.stringify(
				query,
			)}, Body: ${JSON.stringify(body)}`,
		);
	}

	logResponse(url: string, statusCode: number) {
		this.log('log', `Response - URL: ${url}, Status Code: ${statusCode}`);
	}

	logError(type: string, error: any) {
		this.log('error', `${type} - ${JSON.stringify(error)}`);
	}

	private log(level: string, message: string) {
		if (this.shouldLog(level)) {
			const logMessage = `${new Date().toISOString()} [${level}] ${message}\n`;
			this.writeLogToFile(level, logMessage);
		}
	}

	private writeLogToFile(level: string, message: string) {
		const filePath =
			level === 'error' ? this.errorLogFilePath : this.logFilePath;

		fs.access(filePath, fs.constants.F_OK, (err) => {
			if (err) {
				fs.writeFile(filePath, '', (writeErr) => {
					if (writeErr) {
						this.logger.error('Error creating log file:', writeErr);
					}
				});
			}

			fs.stat(filePath, (err, stats) => {
				if (err) {
					this.logger.error(err);
					return;
				}

				if (stats.size >= this.maxFileSize) {
					fs.rename(filePath, `${filePath}.${Date.now()}`, (renameErr) => {
						if (renameErr) {
							this.logger.error('Error rotating log file:', renameErr);
						} else {
							this.logger.log('Log file rotated successfully.');
						}
					});
				}

				fs.appendFile(filePath, message, (appendErr) => {
					// if (appendErr) {
					// 	this.logger.error('Error writing to log file:', appendErr);
					// } else {
					// 	this.logger.log('Log message written successfully.');
					// }
				});
			});
		});
	}

	private shouldLog(level: string): boolean {
		const levels = ['log', 'warn', 'error'];
		const currentLevelIndex = levels.indexOf(this.logLevel);
		const messageLevelIndex = levels.indexOf(level);
		return messageLevelIndex >= currentLevelIndex;
	}
}
