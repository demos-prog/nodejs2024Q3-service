import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Favorites } from './entities/favorites.entity';
import { UpdateFavsDto } from './dto/update-fav.dto';

@Injectable()
export class FavsService {
	constructor(private prisma: PrismaService) {}

	async create(userId: string, newFAvs: Favorites) {
		return this.prisma.favorites.create({
			data: { userId, ...newFAvs },
		});
	}

	async findFirst() {
		return await this.prisma.favorites.findFirst();
	}

	async findAll(userId?: string) {
		if (userId) {
			return this.prisma.favorites.findUnique({ where: { userId } });
		}
		return this.prisma.favorites.findMany();
	}

	async findOne(userId: string) {
		return this.prisma.favorites.findUnique({ where: { userId } });
	}

	async update(userId: string, dto: UpdateFavsDto) {
		return this.prisma.favorites.update({
			where: { userId },
			data: dto,
		});
	}

	async remove(userId: string) {
		return this.prisma.favorites.delete({ where: { userId } });
	}
}
