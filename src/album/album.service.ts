import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
	constructor(private prisma: PrismaService) {}

	async create(createAlbumDto: CreateAlbumDto) {
		return this.prisma.album.create({ data: createAlbumDto });
	}

	async findAll(artistId?: string) {
		if (artistId) {
			return this.prisma.album.findMany({ where: { artistId } });
		}
		return this.prisma.album.findMany();
	}

	async findOne(id: string) {
		return this.prisma.album.findUnique({ where: { id } });
	}

	async update(id: string, updateAlbumDto: UpdateAlbumDto) {
		return this.prisma.album.update({
			where: { id },
			data: updateAlbumDto,
		});
	}

	async remove(id: string) {
		return this.prisma.album.delete({ where: { id } });
	}
}
