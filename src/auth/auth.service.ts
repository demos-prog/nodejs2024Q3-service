import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(
		userId: string,
		login: string,
	): Promise<{ access_token: string }> {
		const payload = { userId, login };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
