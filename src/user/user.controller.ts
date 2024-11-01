import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdatePasswordDto } from './dto/UpdatePassword.dto';

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
		return user;
	}

	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
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
		return this.userService.updatePassword(userId, dto, user.version + 1);
	}
}
