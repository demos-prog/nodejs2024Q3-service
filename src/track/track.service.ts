import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
	constructor(private prisma: PrismaService) {}

	create(createTrackDto: CreateTrackDto) {
		return this.prisma.track.create({ data: createTrackDto });
	}

	findAll() {
		return this.prisma.track.findMany();
	}

	findOne(id: string) {
		return this.prisma.track.findUnique({ where: { id } });
	}

	update(id: string, dto: CreateTrackDto) {
		return this.prisma.track.update({
			where: { id },
			data: dto,
		});
	}

	remove(id: string) {
		return this.prisma.track.delete({ where: { id } });
	}
}
