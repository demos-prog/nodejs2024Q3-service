import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Module({
	imports: [PrismaModule],
	controllers: [FavsController],
	providers: [
		FavsService,
		TrackService,
		AlbumService,
		ArtistService
	],
})
export class FavsModule {}
