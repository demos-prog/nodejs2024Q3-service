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
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import comparePassword from '../helpers/compareHash';
import { creatHash } from '../helpers/createHash';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from '../decorators/Publick';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Get()
	async getAll() {
		return await this.userService.getAll();
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
		if (!comparePassword(user.password, dto.oldPassword)) {
			throw new ForbiddenException('Incorrect existing password');
		}

		const updatedDto: UpdatePasswordDto = {
			oldPassword: dto.oldPassword,
			newPassword: creatHash(dto.newPassword),
		};

		const updatedUser = await this.userService.updatePassword(
			userId,
			updatedDto,
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
