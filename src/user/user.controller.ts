import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';

export let currentUserId = '9b7dd582-1be6-448c-8ed2-65195be7c601';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getAll() {
		return this.userService.getAll();
	}

	@Get(':id')
	async getById(@Param('id', new ParseUUIDPipe()) id: string) {
		const user = await this.userService.getById(id);
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return Object.keys(user)
			.filter((field) => field !== 'password')
			.reduce((acc, field) => {
				acc[field] = user[field];
				return acc;
			}, {});
	}

	@Post()
	async create(@Body() dto: CreateUserDto) {
		const user = await this.userService.create(dto);
		currentUserId = user.id;
		return {
			...user,
			createdAt: new Date(user.createdAt).getTime(),
			updatedAt: new Date(user.updatedAt).getTime(),
		};
	}

	@Put(':id')
	async updatePassword(
		@Param('id', new ParseUUIDPipe()) userId: string,
		@Body() dto: UpdatePasswordDto,
	) {
		const user = await this.userService.getById(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}
		if (user.password !== dto.oldPassword) {
			throw new ForbiddenException('Incorrect existing password');
		}
		const updatedUser = await this.userService.updatePassword(
			userId,
			dto,
			user.version + 1,
		);
		return {
			...updatedUser,
			createdAt: new Date(updatedUser.createdAt).getTime(),
			updatedAt: new Date(updatedUser.updatedAt).getTime(),
		};
	}

	@Delete(':id')
	@HttpCode(204)
	async delete(@Param('id', new ParseUUIDPipe()) userId: string) {
		const user = await this.userService.getById(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}
		await this.userService.delete(userId);
	}
}
