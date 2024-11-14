import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
	private readonly logger = new Logger(LoggingService.name);

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
}
