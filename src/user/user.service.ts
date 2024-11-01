import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';

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

	async updatePassword(
		userId: string,
		dto: UpdatePasswordDto,
		version: number,
	) {
		return this.prisma.user.update({
			where: { id: userId },
			data: { password: dto.newPassword, version },
		});
	}

	async delete(userId: string) {
		return this.prisma.user.delete({ where: { id: userId } });
	}
}
