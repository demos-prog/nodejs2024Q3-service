import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavsService {
	constructor(private prisma: PrismaService) {}

	async create(id: string, userId: string, newFAvs: Favorites) {
		return this.prisma.favorites.create({ data: { id, userId, ...newFAvs } });
	}

	async findAll() {
		return this.prisma.favorites.findMany();
	}

	async findOne(id: string) {
		return this.prisma.favorites.findUnique({ where: { id } });
	}

	async update(id: string) {
		return `This action updates a #${id} fav`;
	}

	async remove(id: string) {
		return `This action removes a #${id} fav`;
	}
}
