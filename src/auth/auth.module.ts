import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { FavsService } from 'src/favs/favs.service';

@Module({
	imports: [
		PrismaModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET_KEY,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, FavsService],
})
export class AuthModule {}
