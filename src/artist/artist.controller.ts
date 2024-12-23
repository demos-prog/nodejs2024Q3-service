import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	NotFoundException,
	ParseUUIDPipe,
	Put,
	HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumService } from '../album/album.service';

@Controller('artist')
export class ArtistController {
	constructor(
		private readonly artistService: ArtistService,
		private readonly albumService: AlbumService,
	) {}

	@Post()
	async create(@Body() createArtistDto: CreateArtistDto) {
		return await this.artistService.create(createArtistDto);
	}

	@Get()
	async findAll() {
		return await this.artistService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
		const artist = await this.artistService.findOne(id);
		if (!artist) {
			throw new NotFoundException(`Artist with id ${id} not found`);
		}
		return artist;
	}

	@Put(':id')
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() updateArtistDto: UpdateArtistDto,
	) {
		const artist = await this.artistService.findOne(id);
		if (!artist) {
			throw new NotFoundException(`Artist with id ${id} not found`);
		}
		return await this.artistService.update(id, updateArtistDto);
	}

	@Delete(':id')
	@HttpCode(204)
	async remove(@Param('id', new ParseUUIDPipe()) id: string) {
		const artist = await this.artistService.findOne(id);
		if (!artist) {
			throw new NotFoundException(`Artist with id ${id} not found`);
		}
		const res = await this.artistService.remove(id);
		if (res) {
			const albums = await this.albumService.findAll(artist.id);
			albums.forEach(async (album) => {
				await this.albumService.update(album.id, { artistId: null });
			});
		}
	}
}
