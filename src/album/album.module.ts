import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaModule } from 'src/prisma.module';
import { TrackService } from 'src/track/track.service';

@Module({
	imports: [PrismaModule],
	controllers: [AlbumController],
	providers: [AlbumService, TrackService],
})
export class AlbumModule {}
