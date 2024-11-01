import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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

	update(id: number, updateTrackDto: UpdateTrackDto) {
		return `This action updates a #${id} track`;
	}

	remove(id: number) {
		return `This action removes a #${id} track`;
	}
}
