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
	Request,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Favorites } from './entities/favorites.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesResponse } from './dto/response-fav.dto';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Controller('favs')
export class FavsController {
	constructor(
		private readonly favsService: FavsService,
		private readonly trackService: TrackService,
		private readonly albumService: AlbumService,
		private readonly artistService: ArtistService,
	) {}

	@Get()
	async findAll(@Request() req) {
		const userId = req.user.userId;

		const favoritesOfUser: Favorites = await this.favsService.findOne(userId);
		if (!favoritesOfUser) {
			throw new NotFoundException('Favorites not found');
		}

		const favArtists: Artist[] = await Promise.all(
			favoritesOfUser.artists.map(async (artistId) => {
				return await this.artistService.findOne(artistId);
			}),
		);

		const favAlbums: Album[] = await Promise.all(
			favoritesOfUser.albums.map(async (albumId) => {
				return await this.albumService.findOne(albumId);
			}),
		);

		const favTracks: Track[] = await Promise.all(
			favoritesOfUser.tracks.map(async (trackId) => {
				return await this.trackService.findOne(trackId);
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
	async addToFavTracks(
		@Param('id', new ParseUUIDPipe()) trackId: string,
		@Request() req,
	) {
		const track = await this.trackService.findOne(trackId);
		if (!track) {
			throw new UnprocessableEntityException(
				`Track with ID ${trackId} not found in favorites`,
			);
		}

		const userId = req.user.userId;

		const favoritesOfUser: Favorites = await this.favsService.findOne(userId);
		if (!favoritesOfUser) {
			const newFavorites: Favorites = {
				albums: [],
				artists: [],
				tracks: [trackId],
			};
			return await this.favsService.create(userId, newFavorites);
		}
		if (favoritesOfUser.tracks.includes(trackId)) {
			throw new ForbiddenException(
				`Track with ID ${trackId} is already in favorites`,
			);
		}
		favoritesOfUser.tracks.push(trackId);
		return await this.favsService.update(userId, favoritesOfUser);
	}

	@Delete('track/:id')
	@HttpCode(204)
	async removeFromFavTracks(
		@Param('id', new ParseUUIDPipe()) trackId: string,
		@Request() req,
	) {
		const userId = req.user.userId;
		const favoritesOfUser: Favorites = await this.favsService.findOne(userId);

		const track = favoritesOfUser.tracks.find((id) => id === trackId);
		if (!track) {
			throw new NotFoundException(
				`Track with ID ${trackId} not found in favorites`,
			);
		}
		favoritesOfUser.tracks = favoritesOfUser.tracks.filter(
			(id) => id !== trackId,
		);

		await this.favsService.update(userId, favoritesOfUser);
	}

	@Post('album/:id')

	async addToFavAlbums(
		@Param('id', new ParseUUIDPipe()) albumId: string,
		@Request() req,
	) {
		const album = await this.albumService.findOne(albumId);
		if (!album) {
			throw new UnprocessableEntityException(
				`Album with ID ${albumId} not found in favorites`,
			);
		}

		const userId = req.user.userId;

		const favoritesOfUser: Favorites = await this.favsService.findOne(userId);
		if (!favoritesOfUser) {
			const newFavorites: Favorites = {
				albums: [albumId],
				artists: [],
				tracks: [],
			};
			return await this.favsService.create(userId, newFavorites);
		}
		if (favoritesOfUser.albums.includes(albumId)) {
			throw new ForbiddenException(
				`Album with ID ${albumId} is already in favorites`,
			);
		}
		favoritesOfUser.albums.push(albumId);
		return await this.favsService.update(userId, favoritesOfUser);
	}

	@Delete('album/:id')
	@HttpCode(204)
	async removeFromFavAlbums(
		@Param('id', new ParseUUIDPipe()) albumId: string,
		@Request() req,
	) {
		const userId = req.user.userId;

		const favoritesOfUser: Favorites = await this.favsService.findOne(userId);

		const album = favoritesOfUser.albums.find((id) => id === albumId);
		if (!album) {
			throw new NotFoundException(
				`Album with ID ${albumId} not found in favorites`,
			);
		}
		favoritesOfUser.albums = favoritesOfUser.albums.filter(
			(id) => id !== albumId,
		);

		await this.favsService.update(userId, favoritesOfUser);
	}

	@Post('artist/:id')
	async addToFavArtists(
		@Param('id', new ParseUUIDPipe()) artistID: string,
		@Request() req,
	) {
		const artist = await this.artistService.findOne(artistID);
		if (!artist) {
			throw new UnprocessableEntityException(
				`Artist with ID ${artistID} not found in favorites`,
			);
		}

		const userId = req.user.userId;

		const favoritesOfUser: Favorites = await this.favsService.findOne(userId);
		if (!favoritesOfUser) {
			const newFavorites: Favorites = {
				albums: [],
				artists: [artistID],
				tracks: [],
			};
			return await this.favsService.create(userId, newFavorites);
		}
		if (favoritesOfUser.artists.includes(artistID)) {
			throw new ForbiddenException(
				`Artist with ID ${artistID} is already in favorites`,
			);
		}
		favoritesOfUser.artists.push(artistID);
		return await this.favsService.update(userId, favoritesOfUser);
	}

	@Delete('artist/:id')
	@HttpCode(204)
	async removeFromFavArtists(
		@Param('id', new ParseUUIDPipe()) artistId: string,

		@Request() req,
	) {
		const userId = req.user.userId;

		const favoritesOfUser: Favorites = await this.favsService.findOne(userId);
		const artist = favoritesOfUser.artists.find((id) => id === artistId);
		if (!artist) {
			throw new NotFoundException(
				`Artist with ID ${artistId} not found in favorites`,
			);
		}
		favoritesOfUser.artists = favoritesOfUser.artists.filter(
			(id) => id !== artistId,
		);

		await this.favsService.update(userId, favoritesOfUser);
	}
}
