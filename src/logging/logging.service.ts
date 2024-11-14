import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
	private readonly logger = new Logger(LoggingService.name);

	constructor() {
		process.on('uncaughtException', (error) => {
			this.logError('Uncaught Exception', error);
		});

		process.on('unhandledRejection', (reason) => {
			this.logError('Unhandled Rejection', reason);
		});
	}

	logRequest(url: string, query: any, body: any) {
		this.logger.log(
			`Request - URL: ${url}, Query: ${JSON.stringify(
				query,
			)}, Body: ${JSON.stringify(body)}`,
		);
	}

	logResponse(url: string, statusCode: number) {
		this.logger.log(`Response - URL: ${url}, Status Code: ${statusCode}`);
	}

	logError(type: string, error: any) {
		this.logger.error(`${type} - ${JSON.stringify(error)}`);
	}
}
