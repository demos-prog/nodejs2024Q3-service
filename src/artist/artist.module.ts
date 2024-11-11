import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AlbumService } from '../album/album.service';

@Module({
	imports: [PrismaModule],
	controllers: [ArtistController],
	providers: [
		ArtistService,
		AlbumService
	],
})
export class ArtistModule {}
