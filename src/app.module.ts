import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LoggingService } from './logging/logging.service';
import { LoggingModule } from './logging/logging.module';
import { HttpExceptionFilter } from './exceptionfilter/exception.filter';

@Module({
	imports: [
		UserModule,
		TrackModule,
		ArtistModule,
		AlbumModule,
		FavsModule,
		AuthModule,
		LoggingModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
		LoggingService,
	],
})
export class AppModule {}
