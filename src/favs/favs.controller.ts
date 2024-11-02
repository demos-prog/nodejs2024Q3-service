import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Track } from 'src/track/entities/track.entity';
import { Favorites } from './entities/favorites.entity';

@Controller('favs')
export class FavsController {
	constructor(private readonly favsService: FavsService) {}

	@Get()
	async findAll() {
		return this.favsService.findAll();
	}

	@Post('track/:id')
	async create(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() track: Track,
	) {
		const favorites = await this.favsService.findOne(id);
		if (!favorites) {
			const newFavorites: Favorites = {
				albums: [],
				artists: [],
				tracks: [track.id],
			};
			return this.favsService.create(
				id,
				'9b7dd582-1be6-448c-8ed2-65195be7c601',
				newFavorites,
			);
		}
		favorites.tracks.push(track.id);
		return this.favsService.update(id);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.favsService.remove(id);
	}
}
