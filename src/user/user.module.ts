import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FavsService } from 'src/favs/favs.service';

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [
		FavsService,
		UserService,
		PrismaService,
		JwtService
	],
})
export class UserModule {}
