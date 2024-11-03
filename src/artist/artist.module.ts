import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaModule } from 'src/prisma.module';
import { AlbumService } from 'src/album/album.service';

@Module({
	imports: [PrismaModule],
	controllers: [ArtistController],
	providers: [ArtistService, AlbumService],
})
export class ArtistModule {}