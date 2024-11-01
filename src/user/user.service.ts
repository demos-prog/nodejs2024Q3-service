import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.user.findMany();
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async create(dto: CreateUserDto) {
		return this.prisma.user.create({ data: { ...dto, version: 1 } });
	}
}
