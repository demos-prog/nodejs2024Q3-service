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

@Controller('artist')
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Post()
	create(@Body() createArtistDto: CreateArtistDto) {
		return this.artistService.create(createArtistDto);
	}

	@Get()
	findAll() {
		return this.artistService.findAll();
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
		return this.artistService.update(id, updateArtistDto);
	}

	@Delete(':id')
	@HttpCode(204)
	async remove(@Param('id', new ParseUUIDPipe()) id: string) {
		const artist = await this.artistService.findOne(id);
		if (!artist) {
			throw new NotFoundException(`Artist with id ${id} not found`);
		}
		this.artistService.remove(id);
	}
}
