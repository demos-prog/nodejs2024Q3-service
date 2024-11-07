import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from '../prisma.service';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
	constructor(private prisma: PrismaService) {}

	async create(createTrackDto: CreateTrackDto) {
		return this.prisma.track.create({ data: createTrackDto });
	}

	async findAll(albumId?: string) {
		if (albumId) {
			return this.prisma.track.findMany({ where: { albumId } });
		}

		return this.prisma.track.findMany();
	}

	async findOne(id: string) {
		return this.prisma.track.findUnique({ where: { id } });
	}

	async update(id: string, dto: UpdateTrackDto) {
		return this.prisma.track.update({
			where: { id },
			data: dto,
		});
	}

	async remove(id: string) {
		return this.prisma.track.delete({ where: { id } });
	}
}
