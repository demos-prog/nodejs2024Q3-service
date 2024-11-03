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
import { AlbumService } from 'src/album/album.service';

@Controller('favs')
export class FavsController {
	constructor(
		private readonly favsService: FavsService,
		private readonly trackService: TrackService,
		private readonly albumService: AlbumService,
	) {}

	@Get()
	async findAll() {
		return this.favsService.findAll();
	}

	@Post('track/:id')
	async addToFavTracks(@Param('id', new ParseUUIDPipe()) trackId: string) {
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
	async removeFromFavTracks(@Param('id', new ParseUUIDPipe()) trackId: string) {
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

	@Post('album/:id')
	async addToFavAlbums(@Param('id', new ParseUUIDPipe()) albumId: string) {
		const album = await this.albumService.findOne(albumId);
		if (!album) {
			throw new UnprocessableEntityException(
				`Track with ID ${albumId} not found`,
			);
		}
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		if (!favoritesOfUser) {
			const newFavorites: Favorites = {
				albums: [albumId],
				artists: [],
				tracks: [],
			};
			return this.favsService.create(currentUserId, newFavorites);
		}
		if (favoritesOfUser.tracks.includes(albumId)) {
			throw new ForbiddenException(
				`Track with ID ${albumId} is already in favorites`,
			);
		}
		favoritesOfUser.albums.push(albumId);
		return this.favsService.update(currentUserId, favoritesOfUser);
	}

	@Delete('album/:id')
	@HttpCode(204)
	async removeFromFavAlbums(@Param('id', new ParseUUIDPipe()) albumId: string) {
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		const album = favoritesOfUser.albums.find((id) => id === albumId);
		if (!album) {
			throw new NotFoundException(`Track with ID ${albumId} not found`);
		}
		favoritesOfUser.albums = favoritesOfUser.albums.filter(
			(id) => id !== albumId,
		);

		this.favsService.update(currentUserId, favoritesOfUser);
	}
}
