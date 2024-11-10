import {
	Controller,
	Post,
	Body,
	ForbiddenException,
	HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/CreateUser.dto';
import { UserService } from '../user/user.service';
import comparePassword from '../helpers/compareHash';
import { Public } from 'src/decorators/Publick';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Public()
	@Post('signup')
	async create(@Body() createUserDto: CreateUserDto) {
		const user = await this.userService.getBylogin(createUserDto.login);
		if (user) {
			throw new ForbiddenException('User already exists');
		}
		return await this.userService.create(createUserDto);
	}

	@Public()
	@Post('login')
	@HttpCode(200)
	async login(@Body() loginDto: CreateUserDto) {
		const user = await this.userService.getBylogin(loginDto.login);
		if (!user) {
			throw new ForbiddenException('Incorrect login');
		}
		if (!comparePassword(user.password, loginDto.password)) {
			throw new ForbiddenException('Incorrect password');
		}
		return await this.authService.signIn(user.id, loginDto.login);
	}
}
