import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/CreateUser.dto';
import { UserService } from '../user/user.service';
import comparePassword from '../user/helpers/compareHash';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Post('signup')
	async create(@Body() createUserDto: CreateUserDto) {
		const user = await this.userService.getBylogin(createUserDto.login);
		if (user) {
			throw new ForbiddenException('User already exists');
		}
		return await this.userService.create(createUserDto);
	}

	@Post('login')
	async login(@Body() loginDto: CreateUserDto) {
		const user = await this.userService.getBylogin(loginDto.login);
		if (!user) {
			throw new ForbiddenException('Incorrect login');
		}
		if (!comparePassword(user.password, loginDto.password)) {
			throw new ForbiddenException('Incorrect password');
		}
		return;
	}
}
