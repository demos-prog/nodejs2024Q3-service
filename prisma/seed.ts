import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: { login: 'Dima', password: 'password', version: 1 },
	});

	const artist = await prisma.artist.create({
		data: { name: 'Artist 1', grammy: true },
	});

	const track = await prisma.track.create({
		data: { name: 'Track 1', artistId: artist.id, duration: 180 },
	});

	const album = await prisma.album.create({
		data: { name: 'Album 1', artistId: artist.id, year: 3025 },
	});

	await prisma.favorites.create({
		data: { userId: user.id },
	});

	await prisma.favorites.update({
		where: { userId: user.id },
		data: { artists: [artist.id], tracks: [track.id], albums: [album.id] },
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log('Seeding is done !');
		await prisma.$disconnect();
	});