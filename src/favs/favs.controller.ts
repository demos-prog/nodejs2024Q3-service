import {
	Controller,
	Get,
	Post,
	Param,
	Delete,
	ParseUUIDPipe,
	NotFoundException,
	ForbiddenException,
	UnprocessableEntityException,
	HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Favorites } from './entities/favorites.entity';
import { TrackService } from 'src/track/track.service';
import { currentUserId } from 'src/user/user.controller';

@Controller('favs')
export class FavsController {
	constructor(
		private readonly favsService: FavsService,
		private readonly trackService: TrackService,
	) {}

	@Get()
	async findAll() {
		return this.favsService.findAll();
	}

	@Post('track/:id')
	async create(@Param('id', new ParseUUIDPipe()) trackId: string) {
		const track = await this.trackService.findOne(trackId);
		if (!track) {
			throw new UnprocessableEntityException(
				`Track with ID ${trackId} not found`,
			);
		}
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		if (!favoritesOfUser) {
			const newFavorites: Favorites = {
				albums: [],
				artists: [],
				tracks: [trackId],
			};
			return this.favsService.create(currentUserId, newFavorites);
		}
		if (favoritesOfUser.tracks.includes(trackId)) {
			throw new ForbiddenException(
				`Track with ID ${trackId} is already in favorites`,
			);
		}
		favoritesOfUser.tracks.push(trackId);
		return this.favsService.update(currentUserId, favoritesOfUser);
	}

	@Delete('track/:id')
	@HttpCode(204)
	async remove(@Param('id', new ParseUUIDPipe()) trackId: string) {
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		const track = favoritesOfUser.tracks.find((id) => id === trackId);
		if (!track) {
			throw new NotFoundException(`Track with ID ${trackId} not found`);
		}
		favoritesOfUser.tracks = favoritesOfUser.tracks.filter(
			(id) => id !== trackId,
		);

		this.favsService.update(currentUserId, favoritesOfUser);
	}
}
