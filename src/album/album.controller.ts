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

@Controller('album')
export class AlbumController {
	constructor(private readonly albumService: AlbumService) {}

	@Post()
	create(@Body() createAlbumDto: CreateAlbumDto) {
		return this.albumService.create(createAlbumDto);
	}

	@Get()
	findAll() {
		return this.albumService.findAll();
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
		return this.albumService.update(id, updateAlbumDto);
	}

	@Delete(':id')
	@HttpCode(204)
	async remove(@Param('id', new ParseUUIDPipe()) id: string) {
		const album = await this.albumService.findOne(id);
		if (!album) {
			throw new NotFoundException(`Album with id ${id} not found`);
		}
		this.albumService.remove(id);
	}
}
