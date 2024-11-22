import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const request = host.switchToHttp().getRequest();
		const response = host.switchToHttp().getResponse();

		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
