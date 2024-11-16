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
import { Public } from '../decorators/Publick';
import { RefreshTokenDto } from './dto/RefreshToken.dt';

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
		const newUser = await this.userService.create(createUserDto);
		return {
			...newUser,
			createdAt: new Date(newUser.createdAt).getTime(),
			updatedAt: new Date(newUser.updatedAt).getTime(),
		};
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

		return await this.authService.logIn(user.id, loginDto.login);;
	}

	@Public()
	@Post('refresh')
	@HttpCode(200)
	async refresh(@Body() dto: RefreshTokenDto) {
		return await this.authService.refreshToken(dto.refreshToken);
	}
}
