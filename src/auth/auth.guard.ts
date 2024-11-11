import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/Publick';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers['authorization'];

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			throw new UnauthorizedException(
				'Authorization header missing or invalid',
			);
		}

		const token = authHeader.split(' ')[1];

		try {
			const payload = await this.jwtService.verifyAsync(token);
			request.user = payload;
			return true;
		} catch (error) {
			throw new UnauthorizedException('Invalid or expired token');
		}
	}
}
