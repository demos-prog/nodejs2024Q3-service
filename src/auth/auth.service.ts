import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async logIn(
		userId: string,
		login: string,
	): Promise<{
		accessToken: string;
		refreshToken: string;
		userId: string;
		login: string;
	}> {
		const payload = { userId, login };
		return {
			userId,
			login,
			accessToken: await this.jwtService.signAsync(payload, {
				expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
			}),
			refreshToken: await this.jwtService.signAsync(payload, {
				expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
			}),
		};
	}

	async refreshToken(oldRefreshToken: string) {
		try {
			const { userId, login } = await this.jwtService.verifyAsync(
				oldRefreshToken,
			);
			return this.logIn(userId, login);
		} catch (e) {
			return new UnauthorizedException('Invalid or expired token');
		}
	}
}
