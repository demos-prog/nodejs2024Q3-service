import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaModule } from 'src/prisma.module';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Module({
	imports: [PrismaModule],
	controllers: [FavsController],
	providers: [FavsService, TrackService, AlbumService],
})
export class FavsModule {}
