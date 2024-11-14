import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
import { LoggingInterceptor } from './logging/loggingInterceptor';

async function bootstrap() {
	const port = process.env.PORT || 4000;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new LoggingInterceptor(new LoggingService()));
	await app.listen(port, () => {
		console.log(`server listening on http://localhost:${port}`);
	});
}
bootstrap();
