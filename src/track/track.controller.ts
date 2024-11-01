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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
	constructor(private readonly trackService: TrackService) {}

	@Post()
	create(@Body() createTrackDto: CreateTrackDto) {
		return this.trackService.create(createTrackDto);
	}

	@Get()
	findAll() {
		return this.trackService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
		const track = await this.trackService.findOne(id);
		if (!track) {
			throw new NotFoundException(`Track ID ${id} not found`);
		}
		return track;
	}

	@Put(':id')
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() dto: CreateTrackDto,
	) {
		const track = await this.trackService.findOne(id);
		if (!track) {
			throw new NotFoundException(`Track ID ${id} not found`);
		}
		return this.trackService.update(id, dto);
	}

	@Delete(':id')
	@HttpCode(204)
	async remove(@Param('id', new ParseUUIDPipe()) id: string) {
		const track = await this.trackService.findOne(id);
		if (!track) {
			throw new NotFoundException(`Track ID ${id} not found`);
		}
		this.trackService.remove(id);
	}
}
