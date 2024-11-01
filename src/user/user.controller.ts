import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getAll() {
		return this.userService.getAll();
	}

	@Get(':id')
	getById(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.userService.getById(id);
	}

	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
	}
}
