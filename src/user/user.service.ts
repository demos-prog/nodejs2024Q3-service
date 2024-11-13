import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { PrismaService } from '../prisma/prisma.service';
import { creatHash } from '../helpers/createHash';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly favService: FavsService,
	) {}

	async getAll() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				login: true,
				version: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	async getBylogin(login: string) {
		return await this.prisma.user.findFirst({
			where: { login },
		});
	}

	async create(dto: CreateUserDto) {
		const newUser: CreateUserDto = {
			login: dto.login,
			password: creatHash(dto.password),
		};

		return this.prisma.user.create({
			data: { ...newUser, version: 1 },
			select: {
				id: true,
				login: true,
				version: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async updatePassword(
		userId: string,
		dto: UpdatePasswordDto,
		version: number,
	) {
		return this.prisma.user.update({
			where: { id: userId },
			data: { password: dto.newPassword, version },
			select: {
				id: true,
				login: true,
				version: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async delete(userId: string) {
		const user = await this.getById(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}
		const favoritesOfUser = await this.favService.findOne(userId);
		if (favoritesOfUser) {
			await this.favService.remove(userId);
		}
		return this.prisma.user.delete({ where: { id: userId } });
	}
}
