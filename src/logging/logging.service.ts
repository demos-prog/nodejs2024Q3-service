import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
	private readonly logger: Logger;
	private readonly logLevel: string;

	constructor() {
		this.logLevel = process.env.LOG_LEVEL || 'log';
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
			switch (level) {
				case 'error':
					this.logger.error(message);
					break;
				case 'warn':
					this.logger.warn(message);
					break;
				case 'log':
				default:
					this.logger.log(message);
					break;
			}
		}
	}

	private shouldLog(level: string): boolean {
		const levels = ['log', 'warn', 'error'];
		const currentLevelIndex = levels.indexOf(this.logLevel);
		const messageLevelIndex = levels.indexOf(level);
		return messageLevelIndex >= currentLevelIndex;
	}
}
