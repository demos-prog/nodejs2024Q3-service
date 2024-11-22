import { Artist, Album, Track } from '@prisma/client';

export class FavoritesResponse {
	artists: Artist[];
	albums: Album[];
	tracks: Track[];
}
