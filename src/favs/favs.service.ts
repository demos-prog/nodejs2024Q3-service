import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavsService {
	constructor(private prisma: PrismaService) {}

	async create(userId: string, newFAvs: Favorites) {
		return this.prisma.favorites.create({
			data: { userId, ...newFAvs },
		});
	}

	async findAll() {
		return this.prisma.favorites.findMany();
	}

	async findOne(userId: string) {
		return this.prisma.favorites.findUnique({ where: { userId } });
	}

	async update(userId: string) {
		return `This action updates a #${userId} fav`;
	}

	async remove(userId: string) {
		return `This action removes a #${userId} fav`;
	}
}
