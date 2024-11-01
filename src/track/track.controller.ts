import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	NotFoundException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
		return this.trackService.update(+id, updateTrackDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.trackService.remove(+id);
	}
}
