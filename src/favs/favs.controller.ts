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
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesResponse } from './dto/response-fav.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Controller('favs')
export class FavsController {
	constructor(
		private readonly favsService: FavsService,
		private readonly trackService: TrackService,
		private readonly albumService: AlbumService,
		private readonly artistService: ArtistService,
	) {}

	@Get()
	async findAll() {
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);

		const favArtists: Artist[] = await Promise.all(
			favoritesOfUser.artists.map((artistId) => {
				return this.artistService.findOne(artistId);
			}),
		);

		const favAlbums: Album[] = await Promise.all(
			favoritesOfUser.albums.map((albumId) => {
				return this.albumService.findOne(albumId);
			}),
		);

		const favTracks: Track[] = await Promise.all(
			favoritesOfUser.tracks.map((trackId) => {
				return this.trackService.findOne(trackId);
			}),
		);

		const response: FavoritesResponse = {
			artists: favArtists.filter((item) => item !== null),
			albums: favAlbums.filter((item) => item !== null),
			tracks: favTracks.filter((item) => item !== null),
		};

		return response;
	}

	@Post('track/:id')
	async addToFavTracks(@Param('id', new ParseUUIDPipe()) trackId: string) {
		const track = await this.trackService.findOne(trackId);
		if (!track) {
			throw new UnprocessableEntityException(
				`Track with ID ${trackId} not found in favorites`,
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
			return await this.favsService.create(currentUserId, newFavorites);
		}
		if (favoritesOfUser.tracks.includes(trackId)) {
			throw new ForbiddenException(
				`Track with ID ${trackId} is already in favorites`,
			);
		}
		favoritesOfUser.tracks.push(trackId);
		return await this.favsService.update(currentUserId, favoritesOfUser);
	}

	@Delete('track/:id')
	@HttpCode(204)
	async removeFromFavTracks(@Param('id', new ParseUUIDPipe()) trackId: string) {
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		const track = favoritesOfUser.tracks.find((id) => id === trackId);
		if (!track) {
			throw new NotFoundException(
				`Track with ID ${trackId} not found in favorites`,
			);
		}
		favoritesOfUser.tracks = favoritesOfUser.tracks.filter(
			(id) => id !== trackId,
		);

		await this.favsService.update(currentUserId, favoritesOfUser);
	}

	@Post('album/:id')
	async addToFavAlbums(@Param('id', new ParseUUIDPipe()) albumId: string) {
		const album = await this.albumService.findOne(albumId);
		if (!album) {
			throw new UnprocessableEntityException(
				`Album with ID ${albumId} not found in favorites`,
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
			return await this.favsService.create(currentUserId, newFavorites);
		}
		if (favoritesOfUser.albums.includes(albumId)) {
			throw new ForbiddenException(
				`Album with ID ${albumId} is already in favorites`,
			);
		}
		favoritesOfUser.albums.push(albumId);
		return await this.favsService.update(currentUserId, favoritesOfUser);
	}

	@Delete('album/:id')
	@HttpCode(204)
	async removeFromFavAlbums(@Param('id', new ParseUUIDPipe()) albumId: string) {
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		const album = favoritesOfUser.albums.find((id) => id === albumId);
		if (!album) {
			throw new NotFoundException(
				`Album with ID ${albumId} not found in favorites`,
			);
		}
		favoritesOfUser.albums = favoritesOfUser.albums.filter(
			(id) => id !== albumId,
		);

		await this.favsService.update(currentUserId, favoritesOfUser);
	}

	@Post('artist/:id')
	async addToFavArtists(@Param('id', new ParseUUIDPipe()) artistID: string) {
		const artist = await this.artistService.findOne(artistID);
		if (!artist) {
			throw new UnprocessableEntityException(
				`Artist with ID ${artistID} not found in favorites`,
			);
		}
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		if (!favoritesOfUser) {
			const newFavorites: Favorites = {
				albums: [],
				artists: [artistID],
				tracks: [],
			};
			return await this.favsService.create(currentUserId, newFavorites);
		}
		if (favoritesOfUser.artists.includes(artistID)) {
			throw new ForbiddenException(
				`Artist with ID ${artistID} is already in favorites`,
			);
		}
		favoritesOfUser.artists.push(artistID);
		return await this.favsService.update(currentUserId, favoritesOfUser);
	}

	@Delete('artist/:id')
	@HttpCode(204)
	async removeFromFavArtists(
		@Param('id', new ParseUUIDPipe()) artistId: string,
	) {
		const favoritesOfUser: Favorites = await this.favsService.findOne(
			currentUserId,
		);
		const artist = favoritesOfUser.artists.find((id) => id === artistId);
		if (!artist) {
			throw new NotFoundException(
				`Artist with ID ${artistId} not found in favorites`,
			);
		}
		favoritesOfUser.artists = favoritesOfUser.artists.filter(
			(id) => id !== artistId,
		);

		await this.favsService.update(currentUserId, favoritesOfUser);
	}
}
