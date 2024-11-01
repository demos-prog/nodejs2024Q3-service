import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
	constructor(private prisma: PrismaService) {}

	async create(createArtistDto: CreateArtistDto) {
		return this.prisma.artist.create({ data: createArtistDto });
	}

	async findAll() {
		return this.prisma.artist.findMany();
	}

	async findOne(id: string) {
		return this.prisma.artist.findUnique({ where: { id } });
	}

	async update(id: string, updateArtistDto: UpdateArtistDto) {
		return this.prisma.artist.update({
			where: { id },
			data: updateArtistDto,
		});
	}

	async remove(id: string) {
		return this.prisma.artist.delete({ where: { id } });
	}
}
