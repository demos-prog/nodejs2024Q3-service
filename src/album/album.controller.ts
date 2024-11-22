import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseUUIDPipe,
	NotFoundException,
	Put,
	HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';

@Controller('album')
export class AlbumController {
	constructor(
		private readonly albumService: AlbumService,
		private readonly trackService: TrackService,
	) {}

	@Post()
	async create(@Body() createAlbumDto: CreateAlbumDto) {
		return await this.albumService.create(createAlbumDto);
	}

	@Get()
	async findAll() {
		return await this.albumService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
		const album = await this.albumService.findOne(id);
		if (!album) {
			throw new NotFoundException(`Album with id ${id} not found`);
		}
		return album;
	}

	@Put(':id')
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() updateAlbumDto: UpdateAlbumDto,
	) {
		const album = await this.albumService.findOne(id);
		if (!album) {
			throw new NotFoundException(`Album with id ${id} not found`);
		}
		return await this.albumService.update(id, updateAlbumDto);
	}

	@Delete(':id')
	@HttpCode(204)
	async remove(@Param('id', new ParseUUIDPipe()) id: string) {
		const album = await this.albumService.findOne(id);
		if (!album) {
			throw new NotFoundException(`Album with id ${id} not found`);
		}

		const res = await this.albumService.remove(id);
		if (res) {
			const tracks = await this.trackService.findAll(album.id);
			tracks.forEach(async (track) => {
				await this.trackService.update(track.id, { albumId: null });
			});
		}
	}
}
